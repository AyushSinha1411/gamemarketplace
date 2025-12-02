'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t-4 border-primary bg-card/80 mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* GAMEVAULT */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary border-2 border-primary-foreground flex items-center justify-center shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]">
                <span className="text-sm text-primary-foreground font-bold">G</span>
              </div>
              <h4 className="text-lg text-primary tracking-wider font-bold">GAMEVAULT</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Your ultimate destination for buying and selling pre-owned games. Join millions of gamers worldwide.
            </p>
            <div className="flex gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 bg-muted border-2 border-primary/30 flex items-center justify-center hover:bg-primary hover:border-primary-foreground cursor-pointer transition-all hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]">
                  <span className="text-xs text-muted-foreground hover:text-primary-foreground">●</span>
                </div>
              ))}
            </div>
          </div>

          {/* MARKETPLACE */}
          <div>
            <h5 className="text-sm text-foreground mb-4 font-bold tracking-wider border-b-2 border-primary/30 pb-2">MARKETPLACE</h5>
            <ul className="space-y-2">
              {['Browse Games', 'Sell Your Games', 'Deals & Offers', 'New Arrivals'].map(link => (
                <li key={link}>
                  <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors font-bold cursor-pointer">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h5 className="text-sm text-foreground mb-4 font-bold tracking-wider border-b-2 border-primary/30 pb-2">SUPPORT</h5>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'FAQs', 'Shipping Info'].map(link => (
                <li key={link}>
                  <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors font-bold cursor-pointer">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h5 className="text-sm text-foreground mb-4 font-bold tracking-wider border-b-2 border-primary/30 pb-2">COMPANY</h5>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Blog', 'Press Kit'].map(link => (
                <li key={link}>
                  <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors font-bold cursor-pointer">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h5 className="text-sm text-foreground mb-4 font-bold tracking-wider border-b-2 border-primary/30 pb-2">LEGAL</h5>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'].map(link => (
                <li key={link}>
                  <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors font-bold cursor-pointer">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t-4 border-primary pt-8 mb-8">
          <h5 className="text-sm text-foreground mb-3 font-bold tracking-wider">STAY IN THE LOOP</h5>
          <p className="text-xs text-muted-foreground mb-4">
            Get the latest deals, new arrivals, and gaming news delivered to your inbox.
          </p>
          <div className="flex gap-3 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-input border-4 border-primary px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
            />
            <button className="bg-primary text-primary-foreground text-xs px-6 py-3 border-2 border-primary-foreground hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t-4 border-primary pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-bold">
            ©2025 GAMEVAULT. ALL RIGHTS RESERVED. MADE WITH ❤️ FOR GAMERS.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-green-500 font-bold">■</span>
            <span className="text-xs text-muted-foreground font-bold">ALL SYSTEMS OPERATIONAL</span>
            <span className="text-muted-foreground text-sm">🔒</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

