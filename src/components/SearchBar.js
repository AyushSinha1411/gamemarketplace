'use client';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Q Search games, genres, or sellers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-input border-4 border-primary px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[8px_8px_0_0_rgba(255,69,0,0.3)] transition-all"
      />
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-transform">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
}

