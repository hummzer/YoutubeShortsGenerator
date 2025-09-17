import React, { useState } from 'react';
import Layout from '@/components/ui/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Register
          </button>
          <p className="mt-4 text-center">
            Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}