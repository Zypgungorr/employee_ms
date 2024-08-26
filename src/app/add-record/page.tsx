"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function AddRecords() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/logIn");
    }
  }, [router]);

  const [identity_no1, setIdentity1] = useState("");
  const [date, setDate] = useState("");
  const [entry_time, setEntryTime] = useState("");
  const [exit_time, setExitTime] = useState("");

  const [identity_no2, setIdentity2] = useState("");
  const [begin_date, setBeginDate] = useState("");
  const [end_date, setEndDate] = useState("");
 

  const handleAddRecord1 = async () => {
    try {
      // birleştirme
      const formattedEntryTime = `${date}T${entry_time}:00`;
      const formattedExitTime = `${date}T${exit_time}:00`;

      const response = await fetch("/api/addRecords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identity_no1,
          entry_time: formattedEntryTime,
          exit_time: formattedExitTime,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(
          `Kayıt Eklendi: ${result.record.identity_no} - Giriş: ${result.record.entry_time} - Çıkış: ${result.record.exit_time}`
        );
        setIdentity1("");
        setDate("");
        setEntryTime("");
        setExitTime("");
      } else {
        alert("Kayıt eklenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Veri gönderim hatası:", error);
      alert("Bir hata oluştu.");
    }
  };
  const handleAddRecord2 = async () => {
    try {
      const response = await fetch("/api/addRecords2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identity_no2,
          begin_date,
          end_date,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(
          `Kayıt Eklendi: ${result.record.identity_no} - Giriş: ${result.record.begin_date} - Çıkış: ${result.record.end_date}`
        );
        setIdentity2("");
        setBeginDate("");
        setEndDate("");
      } else {
        alert("Kayıt eklenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Veri gönderim hatası:", error);
      alert("Bir hata oluştu.");
    }
  };

  return (
    <div className="bg-zinc-600 h-full">
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="flex justify-between w-10/12 p-10">
          {/* TRANSACTION TIME */}
          <div className="p-5 m-10 w-5/12 rounded-xl border-solid border-4 border-white bg-zinc-300">
            <div className="p-10">
              <h1 className="flex justify-center text-zinc-600 font-bold text-2xl mb-6">
                ADD TRANSACTION
              </h1>

              {/* Çalışan Kimlik No */}
              <div className="mb-4">
                <h3 className="text-zinc-700 mb-2">Identity Number:</h3>
                <input
                  className="rounded-md bg-zinc-200 p-1 w-full"
                  type="text"
                  value={identity_no1}
                  onChange={(e) => setIdentity1(e.target.value)}
                />
              </div>

              {/* Tarih Seçimi */}
              <div className="mb-4">
                <h3 className="text-zinc-700 mb-2">Date:</h3>
                <input
                  className="w-full p-1 bg-zinc-200 rounded-md"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Giriş Saati */}
              <div className="mb-4">
                <h3 className="text-zinc-700 mb-2">Entry Time:</h3>
                <input
                  className="w-full p-1 bg-zinc-200 rounded-md"
                  type="time"
                  value={entry_time}
                  onChange={(e) => setEntryTime(e.target.value)}
                />
              </div>

              {/* Çıkış Saati */}
              <div className="mb-6">
                <h3 className="text-zinc-700 mb-2">Exit Time:</h3>
                <input
                  className="w-full p-1 bg-zinc-200 rounded-md"
                  type="time"
                  value={exit_time}
                  onChange={(e) => setExitTime(e.target.value)}
                />
              </div>

              <button
                className="w-full text-white bg-zinc-500 p-2 rounded-md"
                onClick={handleAddRecord1}
              >
                Kayıt Ekle
              </button>
            </div>
          </div>


          {/* VACATION TİME  */}
          <div className="p-5 m-10 w-5/12 rounded-xl border-solid border-4 border-white bg-zinc-300">
            <div className="p-10">
              <h1 className="flex justify-center text-zinc-600 font-bold text-2xl mb-6">
                ADD VACATION
              </h1>

              {/* Çalışan Kimlik No */}
              <div className="mb-4">
                <h3 className="text-zinc-700 mb-2">Identity Number:</h3>
                <input
                  className="rounded-md bg-zinc-200 p-1 w-full"
                  type="text"
                  value={identity_no2}
                  onChange={(e) => setIdentity2(e.target.value)}
                />
              </div>

              {/* Tarih Seçimi */}
              <div className="mb-4">
                <h3 className="text-zinc-700 mb-2">Begin Date:</h3>
                <input
                  className="w-full p-1 bg-zinc-200 rounded-md"
                  type="date"
                  value={begin_date}
                  onChange={(e) => setBeginDate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <h3 className="text-zinc-700 mb-2">End Date:</h3>
                <input
                  className="w-full p-1 bg-zinc-200 rounded-md"
                  type="date"
                  value={end_date}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* Kayıt Ekle Button */}
              <button
                className="w-full text-white bg-zinc-500 p-2 rounded-md"
                onClick={handleAddRecord2}
              >
                Kayıt Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
