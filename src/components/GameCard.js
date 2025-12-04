'use client';

import Link from 'next/link';
import { addToCart } from '@/lib/storage';
import { Star, ShoppingCart, Plus } from 'lucide-react';

export default function GameCard({ game, onCartUpdate }) {
  const savings = (game.originalPrice - game.price).toFixed(2);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(game);
    if (onCartUpdate) onCartUpdate();
  };

  return (
    <Link href={`/game/${game.id}`} className="group block h-full">
      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#202020] transition-all duration-300 h-full flex flex-col border border-white/5 hover:border-white/10 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {game.image ? (
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className={`w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center ${game.image ? 'hidden' : ''}`}>
            <span className="text-gray-500 font-medium">{game.title}</span>
          </div>

          {/* Discount Badge */}
          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
            -{game.discount}%
          </div>

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-white text-black px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {game.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-yellow-500">
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-xs text-gray-500">
              ({game.reviewCount})
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded border border-white/5">
              {game.category}
            </span>
            {game.platforms.slice(0, 2).map(platform => (
              <span key={platform} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded border border-white/5">
                {platform}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 line-through">${game.originalPrice.toFixed(2)}</span>
              <span className="text-xl font-bold text-white">${game.price.toFixed(2)}</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Condition</p>
              <p className="text-sm text-gray-300 font-medium">{game.condition}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
