'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCart, getCartTotal, clearCart, addOrder, getUser } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cartData = getCart();
    const userData = getUser();
    
    if (cartData.length === 0) {
      router.push('/cart');
      return;
    }

    setCart(cartData);
    
    if (userData) {
      setFormData(prev => ({
        ...prev,
        email: userData.email || '',
        fullName: userData.username || ''
      }));
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    if (!formData.address.trim()) newErrors.address = 'Required';
    if (!formData.city.trim()) newErrors.city = 'Required';
    if (!formData.state.trim()) newErrors.state = 'Required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Required';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Required';
    if (!formData.cvv.trim()) newErrors.cvv = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const total = getCartTotal();
    
    // TODO: Integrate payment gateway here (Stripe, PayPal, etc.)
    // Example structure for future integration:
    // const paymentResult = await processPayment({
    //   amount: total * 1.1,
    //   cardNumber: formData.cardNumber,
    //   cardName: formData.cardName,
    //   expiryDate: formData.expiryDate,
    //   cvv: formData.cvv
    // });
    // if (!paymentResult.success) {
    //   setErrors({ ...errors, payment: paymentResult.error });
    //   return;
    // }

    const order = {
      items: cart,
      total: total * 1.1, // Including tax
      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      },
      paymentMethod: 'card',
      paymentStatus: 'completed', // Will be set by payment gateway in future
      // paymentId: paymentResult.id // Will be added when payment gateway is integrated
    };

    const newOrder = addOrder(order);
    clearCart();
    router.push(`/order/${newOrder.id}`);
  };

  if (cart.length === 0) {
    return null;
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-primary mb-8 tracking-wider font-bold">CHECKOUT</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
                <h2 className="text-xl text-primary mb-6 border-b-4 border-primary pb-3 tracking-wider font-bold">SHIPPING INFORMATION</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-foreground mb-2 font-bold">FULL NAME:</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full bg-input border-4 ${errors.fullName ? 'border-red-500' : 'border-primary'} px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-foreground mb-2 font-bold">EMAIL:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-input border-4 ${errors.email ? 'border-red-500' : 'border-primary'} px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs text-foreground mb-2 font-bold">ADDRESS:</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full bg-input border-4 ${errors.address ? 'border-red-500' : 'border-primary'} px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all`}
                      placeholder="123 Main St"
                    />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-foreground mb-2 font-bold">CITY:</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full bg-input border-4 ${errors.city ? 'border-red-500' : 'border-primary'} px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all`}
                      placeholder="New York"
                    />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-foreground mb-2 font-bold">STATE:</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full bg-input border-4 ${errors.state ? 'border-red-500' : 'border-primary'} px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all`}
                      placeholder="NY"
                    />
                    {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-foreground mb-2 font-bold">ZIP CODE:</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full bg-input border-4 ${errors.zipCode ? 'border-red-500' : 'border-primary'} px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all`}
                      placeholder="10001"
                    />
                    {errors.zipCode && <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
                <h2 className="text-xl text-primary mb-6 border-b-4 border-primary pb-3 tracking-wider font-bold">PAYMENT INFORMATION</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-foreground mb-2 font-bold">CARD NUMBER:</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      maxLength="16"
                      className={`w-full bg-input border-4 ${errors.cardNumber ? 'border-red-500' : 'border-primary'} px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-xs text-foreground mb-2 font-bold">CARDHOLDER NAME:</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={`w-full bg-input border-4 ${errors.cardName ? 'border-red-500' : 'border-primary'} px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.cardName && <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-foreground mb-2 font-bold">EXPIRY DATE:</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className={`w-full bg-input border-4 ${errors.expiryDate ? 'border-red-500' : 'border-primary'} px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all`}
                      />
                      {errors.expiryDate && <p className="text-xs text-red-500 mt-1">{errors.expiryDate}</p>}
                    </div>

                    <div>
                      <label className="block text-xs text-foreground mb-2 font-bold">CVV:</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        maxLength="3"
                        className={`w-full bg-input border-4 ${errors.cvv ? 'border-red-500' : 'border-primary'} px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all`}
                        placeholder="123"
                      />
                      {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)] sticky top-24">
                <h2 className="text-xl text-primary mb-6 border-b-4 border-primary pb-3 tracking-wider font-bold">ORDER SUMMARY</h2>
                
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="text-muted-foreground font-bold">{item.title} x{item.quantity}</span>
                      <span className="text-foreground font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 border-t-2 border-primary pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-bold">Subtotal:</span>
                    <span className="text-foreground font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-bold">Shipping:</span>
                    <span className="text-green-500 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-bold">Tax:</span>
                    <span className="text-foreground font-bold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t-2 border-primary pt-4 flex justify-between">
                    <span className="text-lg text-primary font-bold">TOTAL:</span>
                    <span className="text-2xl text-green-500 font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground text-sm px-6 py-4 border-2 border-primary-foreground hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

