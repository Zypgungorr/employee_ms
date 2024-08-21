"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [identityNo, setIdentityNo] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identity_no: identityNo,
          name,
          surname,
          birth_date: birthDate,
          pwd: password,
          department,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
        return;
      }

      router.push("/add-record");
    } catch (error) {
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-5 m-10 w-5/12 rounded-xl border-solid border-4 border-white bg-zinc-300">
        <div className="p-10">
          <h1>Sign Up</h1>
          <div className="mb-4">
            <h3 className="text-zinc-700 mb-2">Kimlik No:</h3>
            <input
              type="text"
              placeholder="Kimlik Numarası"
              value={identityNo}
              onChange={(e) => setIdentityNo(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Ad"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Soyad"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            type="date"
            placeholder="Doğum Tarihi"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="department"
            placeholder="Departman"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <button onClick={handleSignUp}>Kayıt Ol</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
