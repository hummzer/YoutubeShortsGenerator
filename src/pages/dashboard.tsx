import React, { useState } from 'react';
import Layout from '@/components/ui/Layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (status === 'loading') {
    return <Layout><div className="text-center mt-10">Loading...</div></Layout>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Generating shorts... this may take a few minutes.');
    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Successfully started video generation. Your shorts are being created!');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (err) {
      setMessage('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
        <form onSubmit={handleGenerate} className="flex flex-col space-y-4">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste YouTube video URL here..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-lg transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Generating...' : 'Generate Shorts'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </Layout>
  );
}