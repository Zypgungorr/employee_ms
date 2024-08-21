import React from "react";
import { useRouter } from "next/navigation";

export interface Employee {
    identity_no: string;
    name: string;
    surname: string;
    birth_date: Date;
    pwd: string;
}

interface EmployeeListProps {
    employee: Employee[];
}

export default function EmployeeList({ employee }: EmployeeListProps) {
    const router = useRouter();

    const handleEmployeeClick = (id: string) => {
        router.push(`/employee/${id}`);
    };

    return (
        <ul>
            {employee.map((emp: Employee) => (
                <li key={emp.identity_no} className="flex items-center space-x-4 text-lg hover:text-red-800" onClick={() => handleEmployeeClick(emp.identity_no)}>
                    <span>
                        {emp.name} {emp.surname}
                    </span>
                </li>
            ))}
        </ul>
    );
}

