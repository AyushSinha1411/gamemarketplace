// LocalStorage utilities for cart and user data
// No configuration needed - works out of the box!

const CART_KEY = 'vermillion_blaze_cart';
const USER_KEY = 'vermillion_blaze_user';
const ORDERS_KEY = 'vermillion_blaze_orders';

// Cart functions
export const getCart = () => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (game) => {
  if (typeof window === 'undefined') return;
  const cart = getCart();
  const existingItem = cart.find(item => item.id === game.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...game, quantity: 1 });
  }
  
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};

export const removeFromCart = (gameId) => {
  if (typeof window === 'undefined') return;
  const cart = getCart().filter(item => item.id !== gameId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};

export const updateCartQuantity = (gameId, quantity) => {
  if (typeof window === 'undefined') return;
  const cart = getCart();
  const item = cart.find(item => item.id === gameId);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(gameId);
    }
    item.quantity = quantity;
  }
  
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};

export const clearCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_KEY);
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// User functions
export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setUser = (userData) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_KEY);
};

// Orders functions
export const getOrders = () => {
  if (typeof window === 'undefined') return [];
  const orders = localStorage.getItem(ORDERS_KEY);
  return orders ? JSON.parse(orders) : [];
};

export const addOrder = (orderData) => {
  if (typeof window === 'undefined') return;
  const orders = getOrders();
  const newOrder = {
    ...orderData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return newOrder;
};

