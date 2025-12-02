'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllGames, addGame, updateGame, deleteGame, initializeGames } from '@/lib/games';
import gamesData from '@/data/games.json';
import { getUser } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AdminPanel() {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    discount: '',
    image: '',
    category: 'Action',
    platforms: [],
    rating: '',
    reviewCount: '',
    condition: 'Like New',
    seller: ''
  });

  useEffect(() => {
    // Check admin authentication
    const user = getUser();
    if (user && (user.username === 'admin' || user.email === 'admin')) {
      setIsAuthorized(true);
      // Initialize with default games if empty
      initializeGames(gamesData);
      setGames(getAllGames());
    } else {
      setIsAuthorized(false);
    }
    setIsChecking(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const gameData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      discount: parseInt(formData.discount),
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount),
    };

    if (editingGame) {
      updateGame(editingGame.id, gameData);
    } else {
      addGame(gameData);
    }

    setGames(getAllGames());
    setFormData({
      title: '',
      description: '',
      price: '',
      originalPrice: '',
      discount: '',
      image: '',
      category: 'Action',
      platforms: [],
      rating: '',
      reviewCount: '',
      condition: 'Like New',
      seller: ''
    });
    setEditingGame(null);
    setShowAddForm(false);
  };

  const handleEdit = (game) => {
    setEditingGame(game);
    setFormData({
      title: game.title,
      description: game.description,
      price: game.price.toString(),
      originalPrice: game.originalPrice.toString(),
      discount: game.discount.toString(),
      image: game.image || '',
      category: game.category,
      platforms: game.platforms,
      rating: game.rating.toString(),
      reviewCount: game.reviewCount.toString(),
      condition: game.condition,
      seller: game.seller
    });
    setShowAddForm(true);
  };

  const handleDelete = (gameId) => {
    if (confirm('Are you sure you want to delete this game?')) {
      deleteGame(gameId);
      setGames(getAllGames());
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For now, we'll use a file reader to convert to base64
      // In production, you'd upload to a server/CDN
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-primary font-bold">LOADING...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show unauthorized message if not admin
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-card/80 border-4 border-primary p-8 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)] text-center">
              <h1 className="text-3xl text-primary mb-4 tracking-wider font-bold">ACCESS DENIED</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Only administrators can access this page.
              </p>
              <button
                onClick={() => router.push('/login')}
                className="bg-primary text-primary-foreground text-sm px-6 py-3 border-2 border-primary-foreground hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
              >
                GO TO LOGIN
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl text-primary tracking-wider font-bold">ADMIN PANEL</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-primary text-primary-foreground text-sm px-6 py-3 border-2 border-primary-foreground hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
          >
            {showAddForm ? 'CANCEL' : '+ ADD GAME'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-card/80 border-4 border-primary p-6 mb-8 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
            <h2 className="text-2xl text-primary mb-6 tracking-wider font-bold">
              {editingGame ? 'EDIT GAME' : 'ADD NEW GAME'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-foreground mb-2 font-bold">TITLE:</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
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
                  <label className="block text-xs text-foreground mb-2 font-bold">PRICE:</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-2 font-bold">ORIGINAL PRICE:</label>
                  <input
                    type="number"
                    step="0.01"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-2 font-bold">DISCOUNT (%):</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  />
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
                  <label className="block text-xs text-foreground mb-2 font-bold">PLATFORMS (comma-separated):</label>
                  <input
                    type="text"
                    name="platforms"
                    value={formData.platforms.join(', ')}
                    onChange={handleInputChange}
                    placeholder="PC, PS5, Xbox"
                    required
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-2 font-bold">SELLER:</label>
                  <input
                    type="text"
                    name="seller"
                    value={formData.seller}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-2 font-bold">RATING:</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-2 font-bold">REVIEW COUNT:</label>
                  <input
                    type="number"
                    name="reviewCount"
                    value={formData.reviewCount}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
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
                  rows="3"
                  className="w-full bg-input border-4 border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-foreground mb-2 font-bold">IMAGE URL:</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
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

              <button
                type="submit"
                className="bg-primary text-primary-foreground text-sm px-6 py-3 border-2 border-primary-foreground hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
              >
                {editingGame ? 'UPDATE GAME' : 'ADD GAME'}
              </button>
            </form>
          </div>
        )}

        {/* Games List */}
        <div className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
          <h2 className="text-2xl text-primary mb-6 tracking-wider font-bold">ALL GAMES ({games.length})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <div key={game.id} className="bg-background border-4 border-primary p-4">
                <div className="h-32 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-2 border-primary/30 mb-3 overflow-hidden">
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
                    <span className="text-xs text-muted-foreground font-bold text-center px-2">{game.title}</span>
                  </div>
                </div>
                
                <h3 className="text-sm text-primary font-bold mb-2">{game.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">${game.price.toFixed(2)}</p>
                
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(game)}
                    className="flex-1 bg-primary text-primary-foreground text-xs px-3 py-2 border-2 border-primary-foreground hover:shadow-[3px_3px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(game.id)}
                    className="flex-1 bg-red-600 text-white text-xs px-3 py-2 border-2 border-red-400 hover:shadow-[3px_3px_0_0_rgba(255,255,255,0.3)] transition-all font-bold cursor-pointer"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

