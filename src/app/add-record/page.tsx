"use client"
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function AddRecords() {
  const [employee, setEmployee] = useState('');
  const [entry_time, setEntryTime] = useState('');
  const [exit_time, setExitTime] = useState('');

  const handleAddRecord = async () => {
    try {
      const response = await fetch('/api/addRecords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee, entry_time, exit_time }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Kayıt Eklendi: ${result.record.employee} - Giriş: ${result.record.entry_time} - Çıkış: ${result.record.exit_time}`);
        setEmployee('');
        setEntryTime('');
        setExitTime('');
      } else {
        alert('Kayıt eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Veri gönderim hatası:', error);
      alert('Bir hata oluştu.');
    }
  };

  return (
    <div>
    <Navbar />
    <div className="flex justify-center items-center"> 
  <div className='p-5 m-10 w-5/12 rounded-xl border-solid border-4 border-white bg-zinc-300'>
    <div className='p-10'>
      <h1 className='flex justify-center text-3xl text-zinc-700 mb-6'>Giriş/Çıkış Kayıt Ekle</h1>

      {/* Çalışan Adı */}
      <div className='mb-4'>
        <h3 className='text-zinc-700 mb-2'>Çalışan Adı:</h3>
        <input
          className='rounded-md bg-zinc-200 p-1 w-full'
          type="text"
          // placeholder="Çalışan Adı"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        />
      </div>

      {/* Giriş Saati */}
      <div className='mb-4'>
        <h3 className='text-zinc-700 mb-2'>Giriş Saati:</h3>
        <input
          className='w-full p-1 bg-zinc-200 rounded-md'
          type="time"
          value={entry_time}
          onChange={(e) => setEntryTime(e.target.value)}
        />
      </div>

      {/* Çıkış Saati */}
      <div className='mb-6'>
        <h3 className='text-zinc-700 mb-2'>Çıkış Saati:</h3>
        <input
          className='w-full p-1 bg-zinc-200 rounded-md'
          type="time"
          value={exit_time}
          onChange={(e) => setExitTime(e.target.value)}
        />
      </div>

      {/* Kayıt Ekle Button */}
      <button 
        className='w-full text-white bg-zinc-500 p-2 rounded-md'
        onClick={handleAddRecord}
      >
        Kayıt Ekle
      </button>
    </div>
  </div>
</div>
</div>

  );
}
