"use client";
import Navbar from "@/components/Navbar";
import EmployeeList, { Employee } from "@/components/EmployeeList";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Homepage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [employee, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const response = await fetch("/api/getEmployee");
        if (response.ok) {
          const data: Employee[] = await response.json();
          setEmployees(data);
         
        } else {
          console.error("Kayıtlar getirilirken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    }

    fetchRecords();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/logIn");
    }
  }, [router]);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="p-5 m-10 w-5/12 rounded-xl border-solid border-4 border-white bg-zinc-300">
          <div className="p-5">
            <EmployeeList employee={employee}></EmployeeList>
          </div>
        </div>
      </div>
    </div>
  );
}
