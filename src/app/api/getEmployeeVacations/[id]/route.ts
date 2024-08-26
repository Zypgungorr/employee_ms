import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const result = await db.query(
      'SELECT begin_date, end_date, duration FROM hr.vacation WHERE identity_no = $1',
      [id]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Veritabanından veri getirilirken bir hata oluştu.' }, { status: 500 });
  }
}
