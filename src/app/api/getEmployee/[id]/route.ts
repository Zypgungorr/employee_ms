import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const result = await db.query(
            'SELECT identity_no, name, surname, birth_date, pwd, department FROM hr.employee WHERE identity_no = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Çalışan bulunamadı." }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: "Veritabanından kayıt alınırken bir hata oluştu." }, { status: 500 });
    }
}
