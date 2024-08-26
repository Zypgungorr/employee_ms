import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { identity_no1, entry_time, exit_time } = await request.json();

    const result = await db.query(
      'INSERT INTO hr.transaction (identity_no, entry_time, exit_time) VALUES ($1, $2::timestamp without time zone, $3::timestamp without time zone)  RETURNING *',
      [identity_no1, entry_time, exit_time]
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


