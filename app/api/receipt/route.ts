import { head } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response('Missing URL', { status: 400 });
  }

  // Auth check: Only admins can view receipts for now
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    return new Response('Yetkisiz erişim.', { status: 403 });
  }

  try {
    // We can't easily "proxy" a private blob without a signed URL 
    // but we can fetch it and return the body if it's small, 
    // OR we can use the bypass token if we have it.
    // However, the simplest way for a private blob is to use the 'read' capabilities of the token.
    
    // For Vercel Blob, if you have the token, you can just fetch the URL and it will work?
    // No, private blobs are blocked unless accessed via a signed token.
    
    // Let's use fetch with the token if possible, or head to get metadata
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    });

    if (!response.ok) {
       // Try without auth in case it's actually public or we have different token 
       return new Response('Dosyaya erişilemedi.', { status: 404 });
    }

    const blob = await response.blob();
    return new Response(blob, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new Response('Bir hata oluştu.', { status: 500 });
  }
}
