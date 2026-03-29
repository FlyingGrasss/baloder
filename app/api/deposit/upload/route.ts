import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname,
        /* clientPayload */
      ) => {
        // 1. Get current user from Supabase
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          throw new Error('Yetkisiz erişim.');
        }

        // 2. Check if user has too many pending requests (as requested by USER)
        const pendingCount = await prisma.depositRequest.count({
          where: { userId: user.id, status: 'PENDING' }
        });

        if (pendingCount >= 3) { // Increased to 3 just for flexibility
          throw new Error('Zaten bekleyen 3 adet talebiniz bulunmaktadır. Lütfen onların onaylanmasını bekleyin.');
        }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'application/pdf', 'image/gif'],
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/deposit/upload`,
          tokenPayload: JSON.stringify({
            userId: user.id,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('[UPLOAD] Blob completed:', blob.url);
        // DB creation is now handled on the client via server actions
        // to prevent timeout/webhook failures dropping db rows.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("[UPLOAD] General Error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
