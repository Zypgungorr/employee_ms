import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM records');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: "Veritabanından kayıtlar alınırken bir hata oluştu." }, { status: 500 });
  }
}
