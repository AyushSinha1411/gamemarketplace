'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getUser, logout } from '@/lib/storage';
import { getCartItemCount } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, User, Menu, X, LogOut, Package, Shield } from 'lucide-react';

export default function Navigation({ cartCount, onCartUpdate }) {
  const [user, setUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUser(getUser());
    setCartItemCount(getCartItemCount());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
              G
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
              GAMEVAULT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Store
            </Link>
            <Link href="/sell" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Sell Games
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              About
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="text-gray-300 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>

              <Link href="/cart" className="relative text-gray-300 hover:text-white transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {(cartItemCount || cartCount) > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount || cartCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="h-6 w-px bg-white/10"></div>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors">
                  <User className="w-5 h-5" />
                  <span>{user.username || user.email}</span>
                </button>

                <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right">
                  <div className="py-1">
                    <Link href="/orders" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                      <Package className="w-4 h-4" />
                      My Orders
                    </Link>
                    <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                      <Shield className="w-4 h-4" />
                      Admin Panel
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-white/5"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-white hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#121212] border-t border-white/10">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-lg font-medium text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Store
            </Link>
            <Link
              href="/sell"
              className="text-lg font-medium text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sell Games
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <hr className="border-white/10" />
            <Link
              href="/cart"
              className="flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              Cart ({cartItemCount || cartCount})
            </Link>

            {user ? (
              <>
                <Link
                  href="/orders"
                  className="flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Package className="w-5 h-5" />
                  My Orders
                </Link>
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Shield className="w-5 h-5" />
                  Admin Panel
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-lg font-medium text-red-500"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-2">
                <Link
                  href="/login"
                  className="text-center py-2 text-white border border-white/20 rounded hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-center py-2 bg-primary text-white rounded hover:bg-primary/90"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
