'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOrders } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = getOrders();
    const foundOrder = orders.find(o => o.id === params.id);
    
    if (!foundOrder) {
      router.push('/');
      return;
    }
    
    setOrder(foundOrder);
  }, [params.id, router]);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-primary text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card/80 border-4 border-primary p-8 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)] text-center mb-8">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-4xl text-primary mb-4 tracking-wider font-bold">ORDER CONFIRMED!</h1>
            <p className="text-sm text-muted-foreground mb-2">Order ID: <span className="text-primary font-bold">{order.id}</span></p>
            <p className="text-xs text-muted-foreground">Thank you for your purchase!</p>
          </div>

          <div className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)] mb-6">
            <h2 className="text-xl text-primary mb-4 border-b-4 border-primary pb-3 tracking-wider font-bold">ORDER DETAILS</h2>
            
            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b-2 border-primary/30 pb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-2 border-primary/30">
                      <span className="text-[10px] text-muted-foreground font-bold text-center px-1">{item.title}</span>
                    </div>
                    <div>
                      <h3 className="text-sm text-primary font-bold">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-primary pt-4">
              <div className="flex justify-between text-lg mb-2">
                <span className="text-primary font-bold">TOTAL:</span>
                <span className="text-2xl text-green-500 font-bold">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)] mb-6">
            <h2 className="text-xl text-primary mb-4 border-b-4 border-primary pb-3 tracking-wider font-bold">SHIPPING ADDRESS</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-bold text-foreground">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p className="mt-2">Email: {order.shippingAddress.email}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/orders"
              className="bg-primary text-primary-foreground text-sm px-6 py-3 border-2 border-primary-foreground hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] transition-all font-bold text-center cursor-pointer"
            >
              VIEW MY ORDERS
            </Link>
            <Link
              href="/"
              className="border-4 border-primary text-primary text-sm px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-all font-bold text-center cursor-pointer"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

