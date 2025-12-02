'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getUser, logout } from '@/lib/storage';
import { getCartItemCount } from '@/lib/storage';
import { useRouter } from 'next/navigation';

export default function Navigation({ cartCount, onCartUpdate }) {
  const [user, setUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setUser(getUser());
    setCartItemCount(getCartItemCount());
  }, []);

  useEffect(() => {
    if (onCartUpdate) {
      setCartItemCount(getCartItemCount());
    }
  }, [onCartUpdate]);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  return (
    <header className="border-b-4 border-primary bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_0_0_rgba(255,69,0,0.3)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-primary border-2 border-primary-foreground flex items-center justify-center shadow-[4px_4px_0_0_rgba(255,69,0,0.5)]">
              <span className="text-sm text-primary-foreground">G</span>
            </div>
            <h1 className="text-2xl text-primary tracking-wider">GAMEVAULT</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex gap-4 items-center">
            <Link href="/" className="text-xs text-foreground hover:text-primary px-3 py-2 border-2 border-transparent hover:border-primary transition-all cursor-pointer">HOME</Link>
            <Link href="/" className="text-xs bg-primary px-4 py-2 text-primary-foreground border-2 border-primary-foreground shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] cursor-pointer">GAMES</Link>
            <Link href="/sell" className="text-xs text-foreground hover:text-primary px-3 py-2 border-2 border-transparent hover:border-primary transition-all cursor-pointer">SELL</Link>
            <Link href="/about" className="text-xs text-foreground hover:text-primary px-3 py-2 border-2 border-transparent hover:border-primary transition-all cursor-pointer">ABOUT</Link>
          </nav>

          {/* Right side icons and buttons */}
          <div className="flex items-center gap-3">
            <Link href="/" className="text-foreground hover:text-primary p-2 border-2 border-transparent hover:border-primary transition-all cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <Link href="/cart" className="text-foreground hover:text-primary relative p-2 border-2 border-transparent hover:border-primary transition-all cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {(cartItemCount || cartCount) > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-5 h-5 border-2 border-primary-foreground flex items-center justify-center font-bold">
                  {cartItemCount || cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative group">
                <button className="text-xs text-foreground hover:text-primary px-4 py-2 border-2 border-primary/30 hover:border-primary transition-all cursor-pointer">
                  {user.username || user.email}
                </button>
                <div className="absolute right-0 top-full mt-2 bg-card border-4 border-primary shadow-[8px_8px_0_0_rgba(255,69,0,0.3)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/orders" className="block text-xs text-foreground hover:text-primary px-4 py-2 border-b-2 border-primary/30 hover:bg-primary/10 cursor-pointer">
                    MY ORDERS
                  </Link>
                  <Link href="/admin" className="block text-xs text-foreground hover:text-primary px-4 py-2 border-b-2 border-primary/30 hover:bg-primary/10 cursor-pointer">
                    ADMIN PANEL
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left text-xs text-foreground hover:text-primary px-4 py-2 hover:bg-primary/10 cursor-pointer">
                    LOGOUT
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-xs text-foreground hover:text-primary px-4 py-2 border-2 border-primary/30 hover:border-primary transition-all cursor-pointer">SIGN IN</Link>
                <Link href="/signup" className="text-xs bg-primary px-4 py-2 text-primary-foreground border-2 border-primary-foreground hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] transition-all cursor-pointer">SIGN UP</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

