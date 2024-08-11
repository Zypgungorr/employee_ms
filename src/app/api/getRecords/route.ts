// import { NextApiRequest, NextApiResponse } from "next";
// import db from "@/lib/db";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     try {
//       const result = await db.query("SELECT employee, entry_time, exit_time FROM records");
//       res.status(200).json(result.rows);

//     } catch (error) {
//       res.status(500).json({ error: "Veritabanından kayıtlar alınırken bir hata oluştu." });
//     }
//   } else {
//     res.status(405).json({ error: "Yalnızca GET metodu desteklenmektedir." });
//   }
// }


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
