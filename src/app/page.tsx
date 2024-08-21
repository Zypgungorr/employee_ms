"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("token alınmadı");
            router.replace("/logIn");
        } else {
            router.replace("/add-record"); 
        }

        setLoading(false);
    }, [router]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Hoş Geldiniz</h1>
            <p>Giriş yapmak için <a href="/logIn">buraya</a> tıklayın.</p>
        </div>
    );
}
