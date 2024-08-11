import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const {id} = params;

    try {
        await db.query('DELETE FROM records WHERE id = $1', [id]);
        return NextResponse.json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Error deleting record' }, { status: 500 });
    }
}