import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <nav className="container mx-auto px-6 h-16 flex justify-between items-center">
                <Link href="/" className="text-2xl font-serif font-bold text-[#2F3E46] flex items-center gap-2">
                    <span>Worddee.ai</span>
                </Link>
                <ul className="flex space-x-8 text-sm font-medium uppercase tracking-wider text-gray-500">
                    <li>
                        <Link href="/" className="hover:text-[#2F3E46] transition-colors">
                            Challenge
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard" className="hover:text-[#2F3E46] transition-colors">
                            Dashboard
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}