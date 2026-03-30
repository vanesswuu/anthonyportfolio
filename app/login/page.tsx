'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-body">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-black uppercase tracking-tighter mb-4">
            Admin <span className="text-accent italic font-accent lowercase font-normal">Access</span>
          </h1>
          <p className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">Secure Gateway for Anthony Leuterio Systems</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-neutral-400 flex items-center gap-2">
              <Mail size={12} /> Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent outline-none font-bold text-primary" 
              placeholder="admin@anthonyleuterio.com" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-neutral-400 flex items-center gap-2">
              <Lock size={12} /> Password
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent outline-none font-bold text-primary" 
              placeholder="••••••••" 
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">{error}</p>}

          <button 
            disabled={loading}
            className="w-full py-6 bg-primary text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-accent transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-4 group disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
