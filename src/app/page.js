'use client';

import { useState, useEffect } from 'react';
import gamesData from '@/data/games.json';
import { getCartItemCount } from '@/lib/storage';
import { getAllGames, initializeGames } from '@/lib/games';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import GameCard from '@/components/GameCard';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 9;
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    // Initialize games from JSON if localStorage is empty
    initializeGames(gamesData);
    setCartCount(getCartItemCount());
  }, []);

  useEffect(() => {
    const allGames = getAllGames();
    let filtered = allGames;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.seller.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(game => game.category === selectedCategory);
    }

    // Platform filter
    if (selectedPlatform !== 'All') {
      filtered = filtered.filter(game => game.platforms.includes(selectedPlatform));
    }

    // Condition filter
    if (selectedCondition !== 'All Conditions') {
      filtered = filtered.filter(game => game.condition === selectedCondition);
    }

    // Price range filter
    if (selectedPriceRange !== 'All Prices') {
      if (selectedPriceRange === 'Under $20') {
        filtered = filtered.filter(game => game.price < 20);
      } else if (selectedPriceRange === '$20 - $40') {
        filtered = filtered.filter(game => game.price >= 20 && game.price <= 40);
      } else if (selectedPriceRange === '$40 - $60') {
        filtered = filtered.filter(game => game.price > 40 && game.price <= 60);
      } else if (selectedPriceRange === 'Over $60') {
        filtered = filtered.filter(game => game.price > 60);
      }
    }

    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredGames(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, selectedPlatform, selectedCondition, selectedPriceRange, sortBy]);

  const handleCartUpdate = () => {
    setCartCount(getCartItemCount());
  };

  const categories = ['Action', 'RPG', 'Adventure', 'Sports', 'Racing', 'Horror', 'Puzzle', 'Strategy'];
  const platforms = ['PC', 'PS5', 'PS4', 'Xbox', 'Switch'];
  const conditions = ['Like New', 'Excellent', 'Very Good', 'Good'];
  const priceRanges = ['Under $20', '$20 - $40', '$40 - $60', 'Over $60'];

  const categoryCounts = {
    'Action': 1242,
    'RPG': 987,
    'Adventure': 634,
    'Sports': 321,
    'Racing': 281,
    'Horror': 234,
    'Puzzle': 99,
    'Strategy': 452
  };

  // Pagination
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const currentGames = filteredGames.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartCount={cartCount} onCartUpdate={handleCartUpdate} />

      {/* Hero Section */}
      <section 
        className="border-b-4 border-primary py-12 relative"
        style={{
          backgroundImage: 'url(/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary mb-4 tracking-wider leading-tight">
              BROWSE ALL GAMES
            </h2>
            <div className="w-32 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-sm md:text-base text-muted-foreground mb-8 leading-relaxed">
              Discover thousands of pre-owned games at unbeatable prices!
            </p>
            
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>
      </section>

      {/* Main Content - Two Columns */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Filters */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            selectedCondition={selectedCondition}
            setSelectedCondition={setSelectedCondition}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            categories={categories}
            platforms={platforms}
            conditions={conditions}
            priceRanges={priceRanges}
            categoryCounts={categoryCounts}
          />

          {/* Right Column - Game Listings */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="border-4 border-primary bg-card/80 px-4 py-2">
                <p className="text-sm text-primary font-bold tracking-wider">{filteredGames.length} GAMES FOUND</p>
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-input border-4 border-primary text-xs text-foreground px-4 py-2 focus:outline-none focus:shadow-[4px_4px_0_0_rgba(255,69,0,0.3)] transition-all cursor-pointer"
              >
                <option value="featured">SORT: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: Highest</option>
              </select>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentGames.map((game) => (
                <GameCard key={game.id} game={game} onCartUpdate={handleCartUpdate} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-4 border-primary text-primary text-sm px-4 py-2 bg-card/80 hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold"
                >
                  ← PREV
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`border-4 border-primary text-sm px-4 py-2 transition-all font-bold ${
                        currentPage === page
                          ? 'bg-primary text-primary-foreground shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]'
                          : 'bg-card/80 text-primary hover:bg-primary hover:text-primary-foreground'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="border-4 border-primary text-primary text-sm px-4 py-2 bg-card/80 hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold"
                >
                  NEXT →
                </button>
              </div>
            )}

            {filteredGames.length === 0 && (
              <div className="bg-card/80 border-4 border-primary p-12 text-center shadow-[8px_8px_0_0_rgba(255,69,0,0.3)]">
                <p className="text-xl text-muted-foreground font-bold">NO GAMES FOUND</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
