import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { identity_no, name, surname, birth_date, department } = data;

    const result = await db.query(
      "INSERT INTO hr.employee (identity_no, name, surname, birth_date, department) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [identity_no, name, surname, birth_date, department]
    );

    return NextResponse.json({
      message: "Record added successfully",
      employee: result.rows[0],
    });

  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Veritabanına kayıt eklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
