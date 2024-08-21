"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [identity_no, setIdentityNo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/log-in', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identity_no, pwd:password })
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Giriş başarısız.');
                return;
            }

            const { token } = data;
            if (token) {
                localStorage.setItem('token', token); 
                router.push('/'); 
            } else {
                setError('Token alınamadı, lütfen tekrar deneyin.');
            }

        } catch (err) {
            setError('Bir hata oluştu, lütfen tekrar deneyin.');
        }
    };
    

    return (
        <div className='bg-white'>
            <h1>Giriş Yap</h1>
            <input
                type="text"
                placeholder="Kimlik Numarası"
                value={identity_no}
                onChange={(e) => setIdentityNo(e.target.value)}
            />
            <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Giriş Yap</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Henüz bir hesabınız yok mu? <a href="/signUp">Kayıt olun</a></p>
        </div>
    );
}
