"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import gsap from 'gsap';
import '../admin/admin.css';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // GSAP Pop-up Animation
    if (formRef.current) {
      gsap.fromTo(formRef.current, 
        { 
          opacity: 0, 
          scale: 0.8,
          y: 20
        }, 
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.8, 
          ease: 'power4.out',
          delay: 0.2
        }
      );
    }
    
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push('/admin');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/admin');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
    } else {
      router.push('/admin');
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { role: 'admin' }
      }
    });
    
    if (error) {
      setError(error.message);
    } else {
      if (data.session) {
        router.push('/admin');
      } else {
        setSuccess('Account created! Check your email to confirm, then sign in.');
        setIsSignUp(false);
      }
      setPassword('');
      setConfirmPassword('');
    }
    setLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="admin-body">
      <div id="auth-section" className="admin-container">
        <div ref={formRef} className="login-box">
          <h2 style={{ marginBottom: '24px', textAlign: 'center', fontFamily: 'var(--serif)', fontSize: '28px' }}>
            Admin <em>{isSignUp ? 'Sign Up' : 'Access'}</em>
          </h2>
          
          {error && <div style={{ color: '#ff6b6b', marginBottom: '16px', fontSize: '14px', textAlign: 'center', background: 'rgba(255,0,0,0.1)', padding: '10px', borderRadius: '8px' }}>{error}</div>}
          {success && <div style={{ color: '#4ade80', marginBottom: '16px', fontSize: '14px', textAlign: 'center', background: 'rgba(0,255,0,0.1)', padding: '10px', borderRadius: '8px' }}>{success}</div>}

          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="admin-form" style={{ width: '100%' }}>
            <input 
              type="email" 
              placeholder="Admin Email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {isSignUp && (
              <input 
                type="password" 
                placeholder="Confirm Password" 
                required 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            )}
            
            <button type="submit" className="big-btn" disabled={loading} style={{ border: 'none', cursor: 'pointer' }}>
              {loading ? 'Authenticating...' : (isSignUp ? 'Create Admin Account' : 'Authenticate Server')}
            </button>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccess(''); }} 
                className="text-link"
                style={{ background: 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer' }}
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
              
              <button 
                type="button" 
                onClick={() => router.push('/')} 
                className="text-link"
                style={{ background: 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer', opacity: 0.6 }}
              >
                ← Back to Homepage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
