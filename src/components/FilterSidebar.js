'use client';

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedPlatform,
  setSelectedPlatform,
  selectedCondition,
  setSelectedCondition,
  selectedPriceRange,
  setSelectedPriceRange,
  categories,
  platforms,
  conditions,
  priceRanges,
  categoryCounts
}) {
  return (
    <aside className="lg:w-72 flex-shrink-0">
      <div className="bg-card/80 border-4 border-primary p-6 shadow-[8px_8px_0_0_rgba(255,69,0,0.3)] sticky top-24">
        <h3 className="text-xl text-primary mb-6 border-b-4 border-primary pb-3 tracking-wider">FILTERS</h3>

        {/* Category */}
        <div className="mb-6">
          <h4 className="text-sm text-foreground mb-3 font-bold tracking-wider">CATEGORY:</h4>
          <button
            onClick={() => setSelectedCategory('All Categories')}
            className={`block w-full text-left text-xs py-2 px-3 mb-2 border-2 transition-all cursor-pointer ${
              selectedCategory === 'All Categories' 
                ? 'bg-primary text-primary-foreground border-primary-foreground shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]' 
                : 'text-muted-foreground hover:text-primary border-primary/30 hover:border-primary'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full text-left text-xs py-2 px-3 mb-2 border-2 transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-primary text-primary-foreground border-primary-foreground shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]' 
                  : 'text-muted-foreground hover:text-primary border-primary/30 hover:border-primary'
              }`}
            >
              {cat} ({categoryCounts[cat] || 0})
            </button>
          ))}
        </div>

        {/* Platform */}
        <div className="mb-6">
          <h4 className="text-sm text-foreground mb-3 font-bold tracking-wider">PLATFORM:</h4>
          <button
            onClick={() => setSelectedPlatform('All')}
            className={`block w-full text-left text-xs py-2 px-3 mb-2 border-2 transition-all cursor-pointer ${
              selectedPlatform === 'All' 
                ? 'bg-primary text-primary-foreground border-primary-foreground shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]' 
                : 'text-muted-foreground hover:text-primary border-primary/30 hover:border-primary'
            }`}
          >
            All
          </button>
          {platforms.map(platform => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`block w-full text-left text-xs py-2 px-3 mb-2 border-2 transition-all cursor-pointer ${
                selectedPlatform === platform 
                  ? 'bg-primary text-primary-foreground border-primary-foreground shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]' 
                  : 'text-muted-foreground hover:text-primary border-primary/30 hover:border-primary'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Condition */}
        <div className="mb-6">
          <h4 className="text-sm text-foreground mb-3 font-bold tracking-wider">CONDITION:</h4>
          <button
            onClick={() => setSelectedCondition('All Conditions')}
            className={`block w-full text-left text-xs py-2 px-3 mb-2 border-2 transition-all cursor-pointer ${
              selectedCondition === 'All Conditions' 
                ? 'bg-primary text-primary-foreground border-primary-foreground shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]' 
                : 'text-muted-foreground hover:text-primary border-primary/30 hover:border-primary'
            }`}
          >
            All Conditions
          </button>
          {conditions.map(condition => (
            <button
              key={condition}
              onClick={() => setSelectedCondition(condition)}
              className={`block w-full text-left text-xs py-2 px-3 mb-2 border-2 transition-all cursor-pointer ${
                selectedCondition === condition 
                  ? 'bg-primary text-primary-foreground border-primary-foreground shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]' 
                  : 'text-muted-foreground hover:text-primary border-primary/30 hover:border-primary'
              }`}
            >
              {condition}
            </button>
          ))}
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm text-foreground mb-3 font-bold tracking-wider">PRICE RANGE:</h4>
          <button
            onClick={() => setSelectedPriceRange('All Prices')}
            className={`block w-full text-left text-xs py-2 px-3 mb-2 border-2 transition-all cursor-pointer ${
              selectedPriceRange === 'All Prices' 
                ? 'bg-primary text-primary-foreground border-primary-foreground shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]' 
                : 'text-muted-foreground hover:text-primary border-primary/30 hover:border-primary'
            }`}
          >
            All Prices
          </button>
          {priceRanges.map(range => (
            <button
              key={range}
              onClick={() => setSelectedPriceRange(range)}
              className={`block w-full text-left text-xs py-2 px-3 mb-2 border-2 transition-all cursor-pointer ${
                selectedPriceRange === range 
                  ? 'bg-primary text-primary-foreground border-primary-foreground shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]' 
                  : 'text-muted-foreground hover:text-primary border-primary/30 hover:border-primary'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

