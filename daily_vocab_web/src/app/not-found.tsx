// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#8DA399] flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <div className="text-6xl mb-4">🤔</div>
        <h2 className="text-3xl font-serif font-bold text-[#2F3E46] mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          Oops! We couldn't find the word or page you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#2F3E46] text-white rounded-full font-medium hover:bg-[#1a2429] transition-all shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}