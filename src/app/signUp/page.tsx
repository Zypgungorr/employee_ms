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

      alert("You are registered! You can log in.");
      router.push("/homepage");
    } catch (error) {
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-zinc-800 h-full">
      <div className="p-5 m-5 mt-10 w-4/12 rounded-xl border-solid border-4 border-white bg-zinc-300">
        <div className="p-10">
          <h1 className="flex justify-center text-zinc-600 font-bold text-3xl mb-6">
            SIGN UP
          </h1>
          <div className="mb-4">
            <h3 className="text-zinc-700 mb-2">Identity No:</h3>
            <input
              className="w-full p-1 bg-zinc-200 rounded-md"
              type="text"
              placeholder="identity number"
              value={identityNo}
              onChange={(e) => setIdentityNo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <h3 className="text-zinc-700 mb-2">Name:</h3>
            <input
              className="w-full p-1 bg-zinc-200 rounded-md"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <h3 className="text-zinc-700 mb-2">Surname:</h3>
            <input
              className="w-full p-1 bg-zinc-200 rounded-md"
              type="text"
              placeholder="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <h3 className="text-zinc-700 mb-2">Birth Date:</h3>
            <input
              className="w-full p-1 bg-zinc-200 rounded-md"
              type="date"
              placeholder="birth date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <h3 className="text-zinc-700 mb-2">Password:</h3>
            <input
              className="w-full p-1 bg-zinc-200 rounded-md"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <h3 className="text-zinc-700 mb-2">Department:</h3>
            <input
              className="w-full p-1 bg-zinc-200 rounded-md"
              type="department"
              placeholder="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <button
            className="mt-3 w-full text-white bg-zinc-500 p-2 rounded-md"
            onClick={handleSignUp}
          >
            Kayıt Ol
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="mt-6">
          Do you have an existing account? <a className="hover:text-zinc-500" href="/logIn">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
