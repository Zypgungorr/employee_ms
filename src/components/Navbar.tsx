import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-zinc-800 p-3">
            <ul className="list-none m-0 p-0 flex justify-center">
                <li className="mr-20"><Link href="/" className='text-white decoration-red hover:text-zinc-400'>Ana Sayfa</Link></li>
                <li className="mr-20"><Link href="/records" className='text-white decoration-black hover:text-zinc-400'>Kayıtlar</Link></li>
            </ul>
            
        </nav>
    );
}
