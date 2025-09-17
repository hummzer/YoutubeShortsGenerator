import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow p-4">
      <nav className="flex items-center justify-between container mx-auto">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          teasy
        </Link>
        <div className="space-x-4">
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/register" className="bg-blue-500 text-white px-4 py-2 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;