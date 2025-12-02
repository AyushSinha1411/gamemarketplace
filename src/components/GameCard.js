'use client';

import Link from 'next/link';
import { addToCart } from '@/lib/storage';

export default function GameCard({ game, onCartUpdate }) {
  const savings = (game.originalPrice - game.price).toFixed(2);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(game);
    if (onCartUpdate) onCartUpdate();
  };

  return (
    <Link href={`/game/${game.id}`}>
      <div className="bg-card/80 border-4 border-primary p-4 hover:shadow-[8px_8px_0_0_rgba(255,69,0,0.5)] transition-all group cursor-pointer h-full flex flex-col">
        {/* Discount Badge */}
        <div className="relative mb-3">
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-3 py-1 border-2 border-primary-foreground z-10 font-bold shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]">
            -{game.discount}%
          </div>
          <div className="h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-2 border-primary/30 group-hover:border-primary transition-colors overflow-hidden">
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
              <span className="text-muted-foreground text-xs font-bold text-center px-2">{game.title}</span>
            </div>
          </div>
        </div>

        {/* Genre and Platform Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] bg-muted text-muted-foreground px-2 py-1 border-2 border-primary/20 font-bold">
            {game.category}
          </span>
          <span className="text-[10px] bg-muted text-muted-foreground px-2 py-1 border-2 border-primary/20 font-bold">
            {game.platforms[0]} {game.platforms.length > 1 ? `+${game.platforms.length - 1}` : ''}
          </span>
        </div>

        {/* Game Title */}
        <h3 className="text-sm text-card-foreground mb-2 font-bold tracking-wider leading-tight flex-grow">{game.title}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base text-primary">★</span>
          <span className="text-xs text-muted-foreground font-bold">
            {game.rating} ({game.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Condition and Seller */}
        <div className="mb-3 space-y-1">
          <p className="text-[10px] text-muted-foreground font-bold">{game.condition}</p>
          <p className="text-[10px] text-muted-foreground">by {game.seller}</p>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-end justify-between gap-2 mt-auto">
          <div>
            <p className="text-2xl text-green-500 font-bold">${game.price.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground line-through">${game.originalPrice.toFixed(2)}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleAddToCart}
              className="bg-primary text-primary-foreground text-xs px-4 py-2 border-2 border-primary-foreground hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
            >
              ADD TO CART
            </button>
            <button 
              onClick={handleAddToCart}
              className="bg-green-600 text-white text-[10px] px-3 py-1 border-2 border-green-400 hover:shadow-[3px_3px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
            >
              SAVE ${savings}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

