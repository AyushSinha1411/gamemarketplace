'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOrders, getUser } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getUser();
    if (!userData) {
      router.push('/login');
      return;
    }
    
    setUser(userData);
    const allOrders = getOrders();
    setOrders(allOrders.reverse()); // Most recent first
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-primary mb-8 tracking-wider font-bold">MY ORDERS</h1>

        {orders.length === 0 ? (
          <div className="bg-card/80 border-4 border-primary p-12 text-center shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
            <p className="text-xl text-muted-foreground mb-6 font-bold">NO ORDERS YET</p>
            <Link 
              href="/"
              className="inline-block bg-primary text-primary-foreground text-sm px-6 py-3 border-2 border-primary-foreground hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
            >
              START SHOPPING
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg text-primary font-bold mb-1">Order #{order.id}</h3>
                    <p className="text-xs text-muted-foreground">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-xl text-green-500 font-bold">${order.total.toFixed(2)}</p>
                    <Link
                      href={`/order/${order.id}`}
                      className="text-xs text-primary hover:underline font-bold cursor-pointer"
                    >
                      VIEW DETAILS →
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t-2 border-primary/30">
                  {order.items.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-2 border-primary/30 mb-2">
                        <span className="text-[8px] text-muted-foreground font-bold text-center px-1">{item.title}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground text-center font-bold">{item.title}</p>
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="flex items-center justify-center">
                      <p className="text-xs text-muted-foreground font-bold">+{order.items.length - 4} more</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

