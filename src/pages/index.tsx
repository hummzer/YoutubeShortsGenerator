import React from 'react';
import Layout from '@/components/ui/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center">
        <h1 className="text-5xl font-bold text-gray-800">Transform Your Videos into Shorts</h1>
        <p className="mt-4 text-xl text-gray-600">teasy automatically generates viral video shorts from your long-form content.</p>
        <Link href="/register" className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors">
          Get Started
        </Link>
      </div>
    </Layout>
  );
}