'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAllGames, initializeGames } from '@/lib/games';
import gamesData from '@/data/games.json';
import { addToCart, getCartItemCount } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Star, Minus, Plus, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation cartCount={cartCount} />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Games
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div className="relative group">
            <div className="aspect-video rounded-lg overflow-hidden border border-white/10 bg-[#1a1a1a] shadow-2xl">
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
              <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] ${game.image ? 'hidden' : ''}`}>
                <span className="text-gray-500 text-xl font-medium">{game.title}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                  -{game.discount}% OFF
                </span>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map(platform => (
                    <span key={platform} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded border border-white/5">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{game.title}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm text-gray-400">
                  {game.reviewCount.toLocaleString()} reviews
                </span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span className="text-sm text-primary font-medium">
                  {game.category}
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg">{game.description}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Condition</p>
                <p className="text-white font-medium">{game.condition}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Seller</p>
                <p className="text-primary font-medium">{game.seller}</p>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6">
              <div className="flex items-end gap-3 mb-6">
                <p className="text-4xl font-bold text-white">${game.price.toFixed(2)}</p>
                <p className="text-lg text-gray-500 line-through mb-1">${game.originalPrice.toFixed(2)}</p>
                <span className="text-sm text-green-500 font-medium mb-1 ml-auto">Save ${savings}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity */}
                <div className="flex items-center bg-black/20 rounded-lg border border-white/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 bg-transparent text-center text-white focus:outline-none font-medium"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => router.push('/checkout')}
                  className="flex-1 bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
