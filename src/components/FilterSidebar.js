'use client';

import { Check } from 'lucide-react';

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
  const FilterSection = ({ title, items, selected, onSelect, showCounts = false }) => (
    <div className="mb-8">
      <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">{title}</h4>
      <div className="space-y-2">
        <button
          onClick={() => onSelect(items.allValue)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors ${
            selected === items.allValue
              ? 'bg-primary text-white font-medium'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <span>{items.allLabel}</span>
          {selected === items.allValue && <Check className="w-4 h-4" />}
        </button>

        {items.options.map(item => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors ${
              selected === item
                ? 'bg-primary text-white font-medium'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>{item}</span>
            <div className="flex items-center gap-2">
              {showCounts && categoryCounts[item] && (
                <span className={`text-xs ${selected === item ? 'text-white/80' : 'text-gray-600'}`}>
                  {categoryCounts[item]}
                </span>
              )}
              {selected === item && <Check className="w-4 h-4" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">Filters</h3>
          <button
            onClick={() => {
              setSelectedCategory('All Categories');
              setSelectedPlatform('All');
              setSelectedCondition('All Conditions');
              setSelectedPriceRange('All Prices');
            }}
            className="text-xs text-primary hover:text-primary/80 font-medium"
          >
            Reset All
          </button>
        </div>

        <FilterSection
          title="Category"
          items={{
            allValue: 'All Categories',
            allLabel: 'All Categories',
            options: categories
          }}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          showCounts={true}
        />

        <FilterSection
          title="Platform"
          items={{
            allValue: 'All',
            allLabel: 'All Platforms',
            options: platforms
          }}
          selected={selectedPlatform}
          onSelect={setSelectedPlatform}
        />

        <FilterSection
          title="Condition"
          items={{
            allValue: 'All Conditions',
            allLabel: 'All Conditions',
            options: conditions
          }}
          selected={selectedCondition}
          onSelect={setSelectedCondition}
        />

        <FilterSection
          title="Price Range"
          items={{
            allValue: 'All Prices',
            allLabel: 'All Prices',
            options: priceRanges
          }}
          selected={selectedPriceRange}
          onSelect={setSelectedPriceRange}
        />
      </div>
    </aside>
  );
}
