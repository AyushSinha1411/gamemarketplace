'use client';

import { Search } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative max-w-2xl mx-auto group">
      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          placeholder="Search games, genres, or sellers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#1a1a1a]/80 backdrop-blur-sm border border-white/10 rounded-full pl-12 pr-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:bg-[#1a1a1a] transition-all shadow-lg"
        />
      </div>
    </div>
  );
}
