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
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [sortBy, setSortBy] = useState('recently-added');
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 9;
  const [filteredGames, setFilteredGames] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    } else if (sortBy === 'recently-added') {
      filtered.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return (b.id || 0) - (a.id || 0);
      });
    }

    setFilteredGames(filtered);
    setCurrentPage(1);
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

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const currentGames = filteredGames.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation cartCount={cartCount} onCartUpdate={handleCartUpdate} />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src="/bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Discover Your Next <span className="text-primary">Adventure</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore thousands of pre-owned games at unbeatable prices. Join the community of gamers today.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button
            className="lg:hidden flex items-center gap-2 text-white bg-[#1a1a1a] px-4 py-2 rounded border border-white/10"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          {/* Sidebar */}
          <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
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
          </div>

          {/* Game Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Games'}
                <span className="ml-3 text-sm font-normal text-gray-500">
                  {filteredGames.length} titles found
                </span>
              </h2>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#1a1a1a] text-white border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="recently-added">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {filteredGames.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onCartUpdate={handleCartUpdate}
                      onCategoryClick={setSelectedCategory}
                      onPlatformClick={setSelectedPlatform}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-primary text-white'
                              : 'bg-[#1a1a1a] border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-12 text-center">
                <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
                <p className="text-gray-400">Try adjusting your filters or search query</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
