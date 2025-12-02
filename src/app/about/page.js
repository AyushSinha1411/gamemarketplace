'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl text-primary mb-4 tracking-wider font-bold">ABOUT GAMEVAULT</h1>
            <div className="w-32 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your ultimate destination for buying and selling pre-owned games. Join millions of gamers worldwide.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-card/80 border-4 border-primary p-8 mb-8 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
            <h2 className="text-3xl text-primary mb-4 tracking-wider font-bold">OUR MISSION</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              At GAMEVAULT, we believe that great games deserve a second life. Our mission is to create a thriving marketplace where gamers can easily buy and sell pre-owned games, making gaming more accessible and sustainable for everyone.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We're committed to providing a safe, secure, and user-friendly platform that connects game enthusiasts while promoting the circular economy in gaming.
            </p>
          </div>

          {/* What We Offer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
              <div className="w-12 h-12 bg-primary border-2 border-primary-foreground flex items-center justify-center mb-4 shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]">
                <span className="text-xl text-primary-foreground font-bold">🛒</span>
              </div>
              <h3 className="text-xl text-primary mb-3 tracking-wider font-bold">FOR BUYERS</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">■</span>
                  <span>Browse thousands of pre-owned games</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">■</span>
                  <span>Competitive prices and great deals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">■</span>
                  <span>Secure checkout and fast shipping</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">■</span>
                  <span>Verified sellers and quality assurance</span>
                </li>
              </ul>
            </div>

            <div className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
              <div className="w-12 h-12 bg-primary border-2 border-primary-foreground flex items-center justify-center mb-4 shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]">
                <span className="text-xl text-primary-foreground font-bold">💰</span>
              </div>
              <h3 className="text-xl text-primary mb-3 tracking-wider font-bold">FOR SELLERS</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">■</span>
                  <span>Easy listing process - list in minutes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">■</span>
                  <span>Reach thousands of potential buyers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">■</span>
                  <span>Set your own prices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">■</span>
                  <span>Fast and secure payments</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Features */}
          <div className="bg-card/80 border-4 border-primary p-8 mb-8 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
            <h2 className="text-3xl text-primary mb-6 tracking-wider font-bold">WHY CHOOSE GAMEVAULT?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm text-primary mb-2 font-bold tracking-wider">🔒 SECURE</h4>
                <p className="text-xs text-muted-foreground">
                  Your data and transactions are protected with industry-standard security measures.
                </p>
              </div>
              <div>
                <h4 className="text-sm text-primary mb-2 font-bold tracking-wider">⚡ FAST</h4>
                <p className="text-xs text-muted-foreground">
                  Quick search, instant checkout, and fast shipping to get your games to you ASAP.
                </p>
              </div>
              <div>
                <h4 className="text-sm text-primary mb-2 font-bold tracking-wider">🌱 SUSTAINABLE</h4>
                <p className="text-xs text-muted-foreground">
                  Give games a second life and reduce electronic waste. Every sale helps the planet.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-card/80 border-4 border-primary p-8 mb-8 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
            <h2 className="text-3xl text-primary mb-6 tracking-wider font-bold text-center">BY THE NUMBERS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl text-primary font-bold mb-2">10K+</div>
                <div className="text-xs text-muted-foreground font-bold">GAMES LISTED</div>
              </div>
              <div className="text-center">
                <div className="text-4xl text-primary font-bold mb-2">5K+</div>
                <div className="text-xs text-muted-foreground font-bold">ACTIVE SELLERS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl text-primary font-bold mb-2">50K+</div>
                <div className="text-xs text-muted-foreground font-bold">HAPPY BUYERS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl text-primary font-bold mb-2">99%</div>
                <div className="text-xs text-muted-foreground font-bold">SATISFACTION RATE</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-primary/20 to-primary/10 border-4 border-primary p-8 text-center shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
            <h2 className="text-3xl text-primary mb-4 tracking-wider font-bold">READY TO GET STARTED?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Join thousands of gamers buying and selling on GAMEVAULT today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-primary text-primary-foreground text-sm px-8 py-3 border-2 border-primary-foreground hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
              >
                BROWSE GAMES
              </Link>
              <Link
                href="/sell"
                className="border-4 border-primary text-primary text-sm px-8 py-3 bg-card/80 hover:bg-primary hover:text-primary-foreground transition-all font-bold cursor-pointer"
              >
                SELL YOUR GAMES
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

