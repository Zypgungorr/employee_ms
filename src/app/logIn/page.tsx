"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [identity_no, setIdentityNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity_no, pwd: password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Giriş başarısız.");
        return;
      }

      const { token } = data;
      if (token) {
        localStorage.setItem("token", token);
        router.push("/homepage");
      } else {
        setError("Token alınamadı, lütfen tekrar deneyin.");
      }
    } catch (err) {
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-zinc-800 h-full">
      <div className="p-5 m-5 mt-2 w-4/12 rounded-xl border-solid border-4 border-white bg-zinc-300">
        <div className="p-10">
          <h1 className="flex justify-center text-zinc-600 font-bold text-3xl mb-6">
            LOG IN
          </h1>
          <div className="mb-4">
            <h3 className="text-zinc-700 mb-2">Identity No:</h3>
            <input
              className="w-full p-1 bg-zinc-200 rounded-md"
              type="text"
              placeholder="identity number"
              value={identity_no}
              onChange={(e) => setIdentityNo(e.target.value)}
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
          <button
            className=" w-full text-white bg-zinc-500 p-2 rounded-md"
            onClick={handleLogin}
          >
            Giriş Yap
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="mt-6">
          Don't have an account yet?  <a className="hover:text-zinc-500" href="/signUp">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
