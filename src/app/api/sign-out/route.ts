import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
       
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Sign out API hata:', error);
        return NextResponse.json({ error: 'Çıkış işlemi başarısız.' }, { status: 500 });
    }
}


