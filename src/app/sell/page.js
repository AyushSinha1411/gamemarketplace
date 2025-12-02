'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/lib/storage';
import { addGame, initializeGames } from '@/lib/games';
import gamesData from '@/data/games.json';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function SellPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    discount: '',
    image: '',
    category: 'Action',
    platforms: [],
    rating: '4.5',
    reviewCount: '0',
    condition: 'Like New',
    seller: ''
  });

  useEffect(() => {
    initializeGames(gamesData);
    const userData = getUser();
    if (userData) {
      setUser(userData);
      setFormData(prev => ({
        ...prev,
        seller: userData.username || userData.email || ''
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'platforms') {
      const platforms = value.split(',').map(p => p.trim()).filter(p => p);
      setFormData({ ...formData, platforms });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateDiscount = () => {
    if (formData.price && formData.originalPrice) {
      const price = parseFloat(formData.price);
      const originalPrice = parseFloat(formData.originalPrice);
      if (originalPrice > price) {
        const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
        setFormData({ ...formData, discount: discount.toString() });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please sign in to sell games');
      router.push('/login');
      return;
    }

    const gameData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice) || parseFloat(formData.price),
      discount: parseInt(formData.discount) || 0,
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount),
      seller: formData.seller || user.username || user.email
    };

    addGame(gameData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        title: '',
        description: '',
        price: '',
        originalPrice: '',
        discount: '',
        image: '',
        category: 'Action',
        platforms: [],
        rating: '4.5',
        reviewCount: '0',
        condition: 'Like New',
        seller: user.username || user.email || ''
      });
      setSubmitted(false);
    }, 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-card/80 border-4 border-primary p-8 text-center shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
            <h1 className="text-3xl text-primary mb-4 tracking-wider font-bold">SIGN IN REQUIRED</h1>
            <p className="text-sm text-muted-foreground mb-6">
              You need to be signed in to sell games on GAMEVAULT.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push('/login')}
                className="bg-primary text-primary-foreground text-sm px-6 py-3 border-2 border-primary-foreground hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
              >
                SIGN IN
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="border-4 border-primary text-primary text-sm px-6 py-3 bg-card/80 hover:bg-primary hover:text-primary-foreground transition-all font-bold cursor-pointer"
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl text-primary mb-2 tracking-wider font-bold">SELL YOUR GAME</h1>
          <div className="w-32 h-1 bg-primary mb-8"></div>
          <p className="text-sm text-muted-foreground mb-8">
            List your pre-owned games and reach thousands of buyers. Fill out the form below to get started.
          </p>

          {submitted && (
            <div className="bg-green-500/20 border-4 border-green-500 p-4 mb-6 text-center">
              <p className="text-sm text-green-500 font-bold">GAME LISTED SUCCESSFULLY!</p>
              <p className="text-xs text-muted-foreground mt-1">Your game is now available for purchase.</p>
            </div>
          )}

          <div className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs text-foreground mb-2 font-bold">GAME TITLE:</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                    placeholder="e.g., The Legend of Zelda: Breath of the Wild"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-2 font-bold">CATEGORY:</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all cursor-pointer"
                  >
                    <option>Action</option>
                    <option>RPG</option>
                    <option>Action RPG</option>
                    <option>Adventure</option>
                    <option>Sports</option>
                    <option>Racing</option>
                    <option>Horror</option>
                    <option>Puzzle</option>
                    <option>Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-2 font-bold">CONDITION:</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all cursor-pointer"
                  >
                    <option>Like New</option>
                    <option>Excellent</option>
                    <option>Very Good</option>
                    <option>Good</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-2 font-bold">SELLING PRICE ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    onBlur={calculateDiscount}
                    required
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                    placeholder="29.99"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-2 font-bold">ORIGINAL PRICE ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    onBlur={calculateDiscount}
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                    placeholder="59.99"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-2 font-bold">PLATFORMS (comma-separated):</label>
                  <input
                    type="text"
                    name="platforms"
                    value={formData.platforms.join(', ')}
                    onChange={handleInputChange}
                    placeholder="PC, PS5, Xbox, Switch"
                    required
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-2 font-bold">SELLER NAME:</label>
                  <input
                    type="text"
                    name="seller"
                    value={formData.seller}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                    placeholder="Your name or username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-foreground mb-2 font-bold">DESCRIPTION:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  placeholder="Describe the game's condition, any included items, shipping details, etc."
                />
              </div>

              <div>
                <label className="block text-xs text-foreground mb-2 font-bold">IMAGE URL:</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/game-image.jpg"
                  className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-foreground mb-2 font-bold">OR UPLOAD IMAGE:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">Note: Images are stored as base64. In production, upload to a CDN.</p>
              </div>

              <div className="bg-muted/50 border-2 border-primary/30 p-4">
                <p className="text-xs text-muted-foreground mb-2 font-bold">SELLING TIPS:</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Take clear, well-lit photos of your game</li>
                  <li>Be honest about the condition</li>
                  <li>Price competitively to sell faster</li>
                  <li>Include all original items (case, manual, etc.)</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground text-sm px-6 py-4 border-2 border-primary-foreground hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
              >
                LIST GAME FOR SALE
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

