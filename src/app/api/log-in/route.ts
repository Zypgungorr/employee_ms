import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    const { identity_no, pwd } = data; 
    
    if (!identity_no || !pwd) {
      return NextResponse.json(
        { error: "Eksik veri: identity_no ve password zorunludur." },
        { status: 400 }
      );
    }

    const result = await db.query('SELECT identity_no, pwd FROM hr.employee WHERE identity_no = $1', [identity_no]);
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json(
        { error: 'Geçersiz kimlik numarası veya şifre' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(pwd, user.pwd);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Geçersiz kimlik numarası veya şifre' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user.identity_no },
      process.env.JWT_SECRET!,      
      { expiresIn: '1h' }           
    );

    return NextResponse.json({ token, expiresIn: 3600 }); 

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Giriş başarısız" },
      { status: 500 }
    );
  }
}


