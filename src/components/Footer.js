'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#121212] border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
                G
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                GAMEVAULT
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Your ultimate destination for buying and selling pre-owned games. Join millions of gamers worldwide in the most trusted marketplace.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h5 className="text-white font-bold mb-6">Marketplace</h5>
            <ul className="space-y-4">
              {['Browse Games', 'Sell Your Games', 'Deals & Offers', 'New Arrivals'].map(link => (
                <li key={link}>
                  <Link href="/" className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Support</h5>
            <ul className="space-y-4">
              {['Help Center', 'Contact Us', 'FAQs', 'Shipping Info'].map(link => (
                <li key={link}>
                  <Link href="/" className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Legal</h5>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'].map(link => (
                <li key={link}>
                  <Link href="/" className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-12 pb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h5 className="text-white font-bold mb-2">Stay in the loop</h5>
              <p className="text-gray-400 text-sm">Get the latest deals and gaming news delivered to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-80 bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
              <button className="bg-primary text-white px-6 py-3 rounded font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 GameVault. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>for gamers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
