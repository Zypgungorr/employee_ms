"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    const handleSignOut = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token bulunamadı.');
            return;
        }

        try {
            const response = await fetch('/api/sign-out', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
              
                localStorage.removeItem('token');
                router.push('/logIn'); 
            } else {
                console.error('Oturum kapatma işlemi başarısız.');
            }
        } catch (error) {
            console.error('Sign out işlemi sırasında hata oluştu:', error);
        }
    };

    return (
            <nav className="bg-zinc-800 p-3">
               <ul className="list-none m-0 p-0 flex justify-center">
                    <li className="mt-2 mr-20"> <Link href="/homepage" className='text-white decoration-black hover:text-zinc-400'>Anasayfa</Link></li>
                    <li className="mt-2 mr-20"><Link href="/add-record" className='text-white decoration-red hover:text-zinc-400'>Kayıt Ekle</Link></li>
                    <li className="mt-2 mr-20"><Link href="/records" className='text-white decoration-black hover:text-zinc-400'>Kayıtlar</Link></li>
                    <li><button onClick={handleSignOut} className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"> Sign Out </button></li>
                </ul>
            </nav>
    );
}


