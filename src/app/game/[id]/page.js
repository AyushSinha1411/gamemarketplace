'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAllGames, initializeGames } from '@/lib/games';
import gamesData from '@/data/games.json';
import { addToCart, getCartItemCount } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [game, setGame] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    initializeGames(gamesData);
    const allGames = getAllGames();
    const foundGame = allGames.find(g => g.id === parseInt(params.id));
    if (!foundGame) {
      router.push('/');
      return;
    }
    setGame(foundGame);
    setCartCount(getCartItemCount());
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (!game) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(game);
    }
    setCartCount(getCartItemCount());
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-primary text-xl">Loading...</p>
      </div>
    );
  }

  const savings = (game.originalPrice - game.price).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartCount={cartCount} />
      
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => router.back()}
          className="text-xs text-primary hover:text-primary/80 mb-6 border-2 border-primary/30 px-4 py-2 hover:border-primary transition-all cursor-pointer"
        >
          ← BACK TO GAMES
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image */}
          <div className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
            <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-2 border-primary/30 overflow-hidden">
              {game.image ? (
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`w-full h-full flex items-center justify-center ${game.image ? 'hidden' : ''}`}>
                <span className="text-muted-foreground text-lg font-bold text-center px-4">{game.title}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary text-primary-foreground text-xs px-3 py-1 border-2 border-primary-foreground font-bold shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]">
                  -{game.discount}% OFF
                </span>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map(platform => (
                    <span key={platform} className="text-[10px] bg-muted text-muted-foreground px-2 py-1 border-2 border-primary/20 font-bold">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl text-primary mb-4 tracking-wider font-bold">{game.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-primary">★</span>
                  <span className="text-sm text-muted-foreground font-bold">
                    {game.rating} ({game.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 border-2 border-primary/20 font-bold">
                  {game.category}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{game.description}</p>
            </div>

            {/* Condition and Seller */}
            <div className="bg-card/80 border-4 border-primary p-4">
              <div className="space-y-2">
                <p className="text-xs text-foreground font-bold">CONDITION: <span className="text-primary">{game.condition}</span></p>
                <p className="text-xs text-foreground font-bold">SELLER: <span className="text-primary">{game.seller}</span></p>
              </div>
            </div>

            {/* Price */}
            <div className="bg-card/80 border-4 border-primary p-6">
              <div className="mb-4">
                <p className="text-4xl text-green-500 font-bold mb-2">${game.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground line-through">${game.originalPrice.toFixed(2)}</p>
                <p className="text-xs text-green-500 font-bold mt-2">YOU SAVE ${savings}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <label className="text-xs text-foreground font-bold mb-2 block">QUANTITY:</label>
                <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-input border-4 border-primary px-3 py-2 text-foreground hover:bg-primary hover:text-primary-foreground transition-all font-bold cursor-pointer"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 bg-input border-4 border-primary px-4 py-2 text-center text-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] font-bold cursor-pointer"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-input border-4 border-primary px-3 py-2 text-foreground hover:bg-primary hover:text-primary-foreground transition-all font-bold cursor-pointer"
              >
                +
              </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-primary-foreground text-sm px-6 py-4 border-2 border-primary-foreground hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.3)] transition-all font-bold mb-3 cursor-pointer"
              >
                ADD TO CART ({quantity})
              </button>
              
              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-green-600 text-white text-sm px-6 py-4 border-2 border-green-400 hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

