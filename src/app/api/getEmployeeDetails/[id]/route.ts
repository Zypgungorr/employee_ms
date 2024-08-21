import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const result = await db.query(
            'SELECT identity_no, entry_time, exit_time FROM hr.transaction WHERE identity_no = $1',
            [id]
        );
        const result2 = await db.query(
            'SELECT identity_no, begin_date, end_date, duration FROM hr.vacation WHERE identity_no = $1',
            [id]
        );

        if (result.rows.length === 0 && result2.rows.length === 0) {
            return NextResponse.json({ error: "Çalışan bulunamadı." }, { status: 404 });
        }

        const combinedResult = {
            ...result.rows[0], 
            ...result2.rows[0]  
        };

        return NextResponse.json(combinedResult);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: "Veritabanından kayıt alınırken bir hata oluştu." }, { status: 500 });
    }
}
