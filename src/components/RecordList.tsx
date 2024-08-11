import React from "react";

// Record tipi tanımlanıyor
export interface Record {
  id: number;
  employee: string;
  entry_time: string;
  exit_time: string;
}

// Bileşen props türü tanımlanıyor
interface RecordListProps {
  records: Record[];
  onDelete: (id: number) => void;
}

export default function RecordList({ records, onDelete }: RecordListProps) {
  return (
    <ul>
      {/* {records.map(record => (
                <li key={record.id}>
                    {record.employee} : {record.entry_time} - {record.exit_time}
                </li>
            ))} */}

      {records.map((record) => (
        <li key={record.id} className="flex items-center space-x-4">
          <span>
            {record.employee} : {record.entry_time} - {record.exit_time}
          </span>
          <button
            className="ml-auto text-red-500"
            onClick={() => onDelete(record.id)}
          >
            Sil
          </button>
        </li>
      ))}
    </ul>
  );
}
