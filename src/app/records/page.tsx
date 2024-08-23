"use client"
import React, { useEffect, useState } from "react";
import RecordList, { Record } from "@/components/RecordList";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const initialRecords: Record[] = [];

export default function RecordsPage() {
  const [records, setRecords] = useState<Record[]>(initialRecords);
  const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log("Token kontrolü:", token);
        if (!token) {
            router.push('/logIn'); 
        }
        
    }, [router]);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const response = await fetch('/api/getRecords');
        if (response.ok) {
          const data: Record[] = await response.json();
          setRecords(data);
        } else {
          console.error('Kayıtlar getirilirken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    }

    fetchRecords();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/deleteRecords/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRecords(records.filter(record => record.id !== id));
      } else {
        console.error('Kayıt silinirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };
  
  return (
    <div className="bg-zinc-600 h-full">
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="p-5 m-10 w-5/12 rounded-xl border-solid border-4 border-white bg-zinc-300">
          <div className="p-5">
            <h1 className="flex justify-center text-3xl text-zinc-700 mb-6">
              Kayıtlar
            </h1>
            <RecordList records={records} onDelete={handleDelete}></RecordList>
          </div>
        </div>
      </div>
    </div>
  );
}
