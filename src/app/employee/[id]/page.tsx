//     const fetchAdditionalData = async () => {
//       try {
//         const response = await fetch(`/api/getEmployeeDetails/${id}`);
//         if (response.ok) {
//           const data: AdditionalData = await response.json();
//           setAdditionalData(data);
//         } else {
//           console.error("Ek veri getirilirken bir hata oluştu.");
//         }
//       } catch (error) {
//         console.error("Veri çekme hatası:", error);
//       }
//     };

//     fetchEmployee();
//     fetchAdditionalData();
//   }, [id]);

//   if (!employee || !additionalData) {
//     return <div>Yükleniyor...</div>;
//   }

//   return (
//     <div className="bg-zinc-600 h-full">
//       <Navbar />
//       <div className="flex justify-center items-center">
//         <div className="p-8 m-10 w-5/12 rounded-xl border-solid border-4 border-white bg-zinc-300">
//         <h1 className="text-center text-zinc-600 font-bold text-2xl mb-4">{employee.name} {employee.surname}</h1>
//           <div className="flex justify-normal p-5">
//             <div>
//             <h1 className="text-lg text-red-800 underline">General Info</h1>
//             <p>Kimlik No: {employee.identity_no}</p>
//             <p>Doğum Tarihi: {new Date(employee.birth_date).toDateString()}</p>
//             <p>Department: {employee.department}</p>
//             <h1 className="mt-10 text-lg text-gray-800 underline">Transaction Info</h1>
//             <p>Entry Time:{" "}{new Date(additionalData.entry_time).toLocaleTimeString([], {hour: "2-digit",minute: "2-digit",})}</p>
//             <p>Exit Time:{" "}{new Date(additionalData.exit_time).toLocaleTimeString([], {hour: "2-digit",minute: "2-digit",})}</p>
//             </div>
//             <div className="ml-10">
//               <h1 className="text-lg text-gray-800 underline">Vacation Info</h1>
//               <p>Begin Date: {new Date(additionalData.begin_date).toDateString()}</p>
//               <p>End Date: {new Date(additionalData.end_date).toDateString()}</p>
//               <p>Duration: {additionalData.duration}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export interface Employee {
  identity_no: string;
  name: string;
  surname: string;
  birth_date: Date;
  pwd: string;
  department: string;
}

export interface Transaction {
  entry_time: string;
  exit_time: string;
}

export interface Vacation {
  begin_date: string;
  end_date: string;
  duration: string;
}

export default function EmployeeDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/logIn");
    }
  }, [router]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`/api/getEmployee/${id}`);
        if (response.ok) {
          const data: Employee = await response.json();
          setEmployee(data);
        } else {
          console.error("Çalışan bilgileri getirilirken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    const fetchAdditionalData = async () => {
      try {
        const transactionResponse = await fetch(`/api/getEmployeeTransactions/${id}`);
        const vacationResponse = await fetch(`/api/getEmployeeVacations/${id}`);

        if (transactionResponse.ok && vacationResponse.ok) {
          const transactionData: Transaction[] =await transactionResponse.json();
          const vacationData: Vacation[] = await vacationResponse.json();

          setTransactions(transactionData);
          setVacations(vacationData); 
        } else {
          console.error("Ek veri getirilirken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchEmployee();
    fetchAdditionalData();
  }, [id]);

  if (!employee || !transactions || !vacations) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="bg-zinc-600 h-full">
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="p-8 m-10 w-5/12 rounded-xl border-solid border-4 border-white bg-zinc-300">
          <h1 className="text-center text-zinc-600 font-bold text-2xl mb-4">
            {employee.name} {employee.surname}
          </h1>
          <div className="flex justify-normal p-5">
            <div>
              <h1 className="text-lg text-red-800 underline">General Info</h1>
              <p>Kimlik No: {employee.identity_no}</p>
              <p>Doğum Tarihi: {new Date(employee.birth_date).toDateString()}</p>
              <p>Department: {employee.department}</p>
              
              <h1 className="mt-10 text-lg text-gray-800 underline">Transaction Info</h1>
              {transactions.length === 0 ? (
                <p>Undefined Data</p>
              ) : (
                <ul>
                  {transactions.map((transaction, index) => (
                    <li key={index}>
                      <p>Entry Time:{" "}{new Date(transaction.entry_time).toLocaleString()}</p>
                      <p>Exit Time:{" "}{new Date(transaction.exit_time).toLocaleString()}</p>
                      <hr className="my-2" />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="ml-10">
              <h1 className="text-lg text-gray-800 underline">Vacation Info</h1>
              {vacations.length === 0 ? (
                <p>Yok</p>
              ) : (
                <ul>
                  {vacations.map((vacation, index) => (
                    <li key={index}>
                      <p>Begin Date:{" "}{new Date(vacation.begin_date).toDateString()}</p>
                      <p>End Date: {new Date(vacation.end_date).toDateString()}</p>
                      <p>Duration: {vacation.duration} gün</p>
                      <hr className="my-2" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
