// import { NextApiRequest, NextApiResponse } from "next";
// import db from "@/lib/db";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     if(req.method === 'POST'){
//         const { employee, entry_time, exit_time } = req.body;

//         try {
//             const result = await db.query('INSERT INTO records (employee, entry_time, exit_time) VALUES ($1, $2, $3) RETURNING *',[employee,entry_time,exit_time]);
//             res.status(200).json(result.rows[0]);
            
//         } catch (error) {
//             res.status(500).json({ error: 'Veritabanına kayıt eklenirken bir hata oluştu.' });
//         }

//     } else {
//     res.status(405).json({ error: 'Yalnızca POST metodu desteklenmektedir.' });
//   }
// }

import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { employee, entry_time, exit_time } = await request.json();

    const result = await db.query(
      'INSERT INTO records (employee, entry_time, exit_time) VALUES ($1, $2, $3) RETURNING *',
      [employee, entry_time, exit_time]
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


