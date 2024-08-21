import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { identity_no, name, surname, birth_date, pwd, department } = data;

    // veri kontrolü
    if (!identity_no || !name || !surname || !pwd) {
      return NextResponse.json(
        { error: "Eksik veri: identity_no, name, surname ve pwd zorunludur." },
        { status: 400 } 
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pwd, saltRounds);

    console.log(hashedPassword);

    const result = await db.query(
      "INSERT INTO hr.employee (identity_no, name, surname, birth_date, pwd, department) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [identity_no, name, surname, birth_date, hashedPassword, department]
    );

    
    return NextResponse.json({
      message: "Record added successfully",
      employee: result.rows[0], 
    });

  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Veritabanına kayıt eklenirken bir hata oluştu."},
      { status: 500 }
    );
  }
}


