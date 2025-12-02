'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { setUser } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Store user in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('vermillion_blaze_users') || '[]');
    
    // Check if email already exists
    if (existingUsers.find(u => u.email === email)) {
      setError('Email already registered');
      return;
    }

    // Add new user
    const newUser = { username, email, password };
    existingUsers.push(newUser);
    localStorage.setItem('vermillion_blaze_users', JSON.stringify(existingUsers));

    // Set current user
    setUser({ email, username });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-card/80 border-4 border-primary p-8 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
            <h1 className="text-3xl text-primary mb-6 tracking-wider font-bold text-center">SIGN UP</h1>
            
            {error && (
              <div className="bg-red-500/20 border-2 border-red-500 p-3 mb-4">
                <p className="text-xs text-red-500 font-bold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-foreground mb-2 font-bold">USERNAME:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label className="block text-xs text-foreground mb-2 font-bold">EMAIL:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-xs text-foreground mb-2 font-bold">PASSWORD:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label className="block text-xs text-foreground mb-2 font-bold">CONFIRM PASSWORD:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground text-sm px-6 py-4 border-2 border-primary-foreground hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
              >
                CREATE ACCOUNT
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground mb-2">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline font-bold cursor-pointer">
                  SIGN IN
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

