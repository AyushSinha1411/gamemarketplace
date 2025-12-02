'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { setUser, getUser } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Check if user exists in localStorage (simple demo)
    const existingUsers = JSON.parse(localStorage.getItem('vermillion_blaze_users') || '[]');
    // Allow login with either email or username
    const user = existingUsers.find(u => 
      (u.email === email || u.username === email) && u.password === password
    );

    if (user) {
      setUser({ email: user.email, username: user.username });
      router.push('/');
    } else {
      setError('Invalid email/username or password');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-card/80 border-4 border-primary p-8 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
            <h1 className="text-3xl text-primary mb-6 tracking-wider font-bold text-center">SIGN IN</h1>
            
            {error && (
              <div className="bg-red-500/20 border-2 border-red-500 p-3 mb-4">
                <p className="text-xs text-red-500 font-bold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-foreground mb-2 font-bold">EMAIL OR USERNAME:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  placeholder="Enter your email or username"
                />
              </div>

              <div>
                <label className="block text-xs text-foreground mb-2 font-bold">PASSWORD:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground text-sm px-6 py-4 border-2 border-primary-foreground hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
              >
                SIGN IN
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground mb-2">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary hover:underline font-bold cursor-pointer">
                  SIGN UP
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

