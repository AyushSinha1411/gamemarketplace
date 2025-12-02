'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCart, removeFromCart, updateCartQuantity, getCartTotal, clearCart, getCartItemCount } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCart();
  }, []);

  const updateCart = () => {
    const cartData = getCart();
    setCart(cartData);
    setCartCount(getCartItemCount());
  };

  const handleRemove = (gameId) => {
    removeFromCart(gameId);
    updateCart();
  };

  const handleQuantityChange = (gameId, newQuantity) => {
    updateCartQuantity(gameId, newQuantity);
    updateCart();
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    router.push('/checkout');
  };

  const total = getCartTotal();

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartCount={cartCount} onCartUpdate={updateCart} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-primary mb-8 tracking-wider font-bold">SHOPPING CART</h1>

        {cart.length === 0 ? (
          <div className="bg-card/80 border-4 border-primary p-12 text-center shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
            <p className="text-xl text-muted-foreground mb-6 font-bold">YOUR CART IS EMPTY</p>
            <Link 
              href="/"
              className="inline-block bg-primary text-primary-foreground text-sm px-6 py-3 border-2 border-primary-foreground hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
            >
              BROWSE GAMES
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Image */}
                    <Link href={`/game/${item.id}`} className="flex-shrink-0 cursor-pointer">
                      <div className="w-32 h-32 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-2 border-primary/30">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-muted-foreground font-bold text-center px-2">{item.title}</span>
                        )}
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-grow">
                      <Link href={`/game/${item.id}`} className="cursor-pointer">
                        <h3 className="text-lg text-primary mb-2 font-bold tracking-wider">{item.title}</h3>
                      </Link>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-[10px] bg-muted text-muted-foreground px-2 py-1 border-2 border-primary/20 font-bold">
                          {item.category}
                        </span>
                        {item.platforms.map(platform => (
                          <span key={platform} className="text-[10px] bg-muted text-muted-foreground px-2 py-1 border-2 border-primary/20 font-bold">
                            {platform}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{item.condition} • by {item.seller}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl text-green-500 font-bold">${item.price.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-foreground font-bold">QTY:</label>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="bg-input border-2 border-primary px-2 py-1 text-foreground hover:bg-primary hover:text-primary-foreground transition-all font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-sm text-foreground font-bold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="bg-input border-2 border-primary px-2 py-1 text-foreground hover:bg-primary hover:text-primary-foreground transition-all font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-xs text-red-500 hover:text-red-700 border-2 border-red-500/30 px-3 py-1 hover:border-red-500 transition-all font-bold cursor-pointer"
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)] sticky top-24">
                <h2 className="text-xl text-primary mb-6 border-b-4 border-primary pb-3 tracking-wider font-bold">ORDER SUMMARY</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-bold">Subtotal:</span>
                    <span className="text-foreground font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-bold">Shipping:</span>
                    <span className="text-green-500 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-bold">Tax:</span>
                    <span className="text-foreground font-bold">${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t-2 border-primary pt-4 flex justify-between">
                    <span className="text-lg text-primary font-bold">TOTAL:</span>
                    <span className="text-2xl text-green-500 font-bold">${(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-primary-foreground text-sm px-6 py-4 border-2 border-primary-foreground hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.3)] transition-all font-bold mb-3 cursor-pointer"
                >
                  PROCEED TO CHECKOUT
                </button>
                
                <Link
                  href="/"
                  className="block w-full text-center border-4 border-primary text-primary text-sm px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-all font-bold cursor-pointer"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

