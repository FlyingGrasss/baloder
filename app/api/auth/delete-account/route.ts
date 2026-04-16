import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: Request) {
  try {
    // We need the service role client to delete a user from Supabase Auth
    const supabase = await createClient(true);
    const regularClient = await createClient();
    
    // Authenticate the request using the regular client (cookie based)
    const { data: { user }, error: authError } = await regularClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const userId = user.id;

    // 1. Delete associated records in the database (cascade delete might handle this if configured, but safe to delete manually if needed)
    // Wait, let's just delete the user. If we have foreign keys without cascade, it fails.
    // It's safer to delete deposit requests, id card orders, and wallet transactions, or just attempt deleting user.
    // Assuming cascade is ON. If not, Prisma will throw an error, we should handle that.
    
    await prisma.$transaction(async (tx) => {
      await tx.depositRequest.deleteMany({ where: { userId } });
      await tx.walletTransaction.deleteMany({ where: { userId } });
      await tx.idCardOrder.deleteMany({ where: { userId } });
      await tx.user.delete({ where: { id: userId } });
    });

    // 2. Delete the user from the Supabase public 'users' table (Balid's DB)
    // This is required so the Supabase trigger doesn't fail with "Database error saving new user" on re-signup.
    const { error: dbDeleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (dbDeleteError) {
      console.warn("Could not delete from balid public.users table or it didn't exist:", dbDeleteError);
    }

    // 3. Delete the user from Supabase Auth
    const { error: deletionError } = await supabase.auth.admin.deleteUser(userId);
    
    if (deletionError) {
      console.error('Error deleting user from Supabase Auth:', deletionError);
      return NextResponse.json({ error: 'Kullanıcı silinirken bir hata oluştu.' }, { status: 500 });
    }

    // 4. Sign out the user
    await regularClient.auth.signOut();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE_ACCOUNT] Error:", error);
    return NextResponse.json(
      { error: 'Kullanıcı hesabı silinirken bir hata oluştu.' },
      { status: 500 },
    );
  }
}
