import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { identity_no2, begin_date, end_date } = await request.json();

    const beginDate = new Date(begin_date);
    const endDate = new Date(end_date);

    const duration = Math.ceil((endDate.getTime() - beginDate.getTime()) / (1000 * 60 * 60 * 24));

    const result = await db.query(
        'INSERT INTO hr.vacation (identity_no, begin_date, end_date, duration) VALUES ($1, $2::date, $3::date, $4::integer) RETURNING *',
        [identity_no2, begin_date, end_date, duration]
      );

    return NextResponse.json({
      message: 'Record added successfully',
      record: result.rows[0],
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Veritabanına kayıt eklenirken bir hata oluştu.' }, { status: 500 });
  }
}