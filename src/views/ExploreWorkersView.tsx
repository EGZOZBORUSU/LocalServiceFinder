import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { WorkerCard } from '../components/WorkerCard';
import {
  MagnifyingGlass,
  SlidersHorizontal,
  X,
  Star,
  ShieldCheck,
  Funnel,
  ArrowCounterClockwise
} from '@phosphor-icons/react';

export const ExploreWorkersView: React.FC = () => {
  const { workers, categories } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(80);
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'jobs'>('rating');

  const filteredWorkers = useMemo(() => {
    return workers
      .filter((w) => {
        // Search term
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = w.fullName.toLowerCase().includes(q);
          const matchHeadline = w.headline.toLowerCase().includes(q);
          const matchCategory = w.category.toLowerCase().includes(q);
          const matchSpecs = w.specialties.some((s) => s.toLowerCase().includes(q));
          if (!matchName && !matchHeadline && !matchCategory && !matchSpecs) {
            return false;
          }
        }

        // Category
        if (selectedCategory !== 'all' && w.category !== selectedCategory) {
          return false;
        }

        // District
        if (selectedDistrict !== 'all' && !w.district.includes(selectedDistrict)) {
          return false;
        }

        // Min Rating
        if (minRating > 0 && w.rating < minRating) {
          return false;
        }

        // Price
        if (w.hourlyRate > maxPrice) {
          return false;
        }

        // Available Today
        if (onlyAvailableToday && !w.availableToday) {
          return false;
        }

        // Verified
        if (onlyVerified && !w.isVerified) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price_asc') return a.hourlyRate - b.hourlyRate;
        if (sortBy === 'jobs') return b.completedJobsCount - a.completedJobsCount;
        return 0;
      });
  }, [
    workers,
    searchTerm,
    selectedCategory,
    selectedDistrict,
    minRating,
    maxPrice,
    onlyAvailableToday,
    onlyVerified,
    sortBy
  ]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDistrict('all');
    setMinRating(0);
    setMaxPrice(80);
    setOnlyAvailableToday(false);
    setOnlyVerified(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
          Explore Service Professionals
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Browse certified plumbers, electricians, cleaners, and handymen in your city.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <aside className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <Funnel size={16} />
              <span>Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
            >
              <ArrowCounterClockwise size={12} />
              <span>Reset</span>
            </button>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Keywords
            </label>
            <div className="relative">
              <MagnifyingGlass
                size={16}
                className="absolute left-3 top-2.5 text-slate-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, pipes, fan..."
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              District / Neighborhood
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="all">All Neighborhoods (Riga)</option>
              <option value="Centrs">Centrs (City Centre)</option>
              <option value="Vecrīga">Vecrīga (Old Town)</option>
              <option value="Teika">Teika</option>
              <option value="Āgenskalns">Āgenskalns</option>
              <option value="Purvciems">Purvciems</option>
              <option value="Imanta">Imanta</option>
              <option value="Pļavnieki">Pļavnieki</option>
              <option value="Mežaparks">Mežaparks</option>
            </select>
          </div>

          {/* Hourly Rate Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Max Hourly Rate
              </label>
              <span className="text-xs font-extrabold text-slate-900">
                €{maxPrice}/hr
              </span>
            </div>
            <input
              type="range"
              min="25"
              max="90"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>€25/hr</span>
              <span>€90/hr</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Minimum Rating
            </label>
            <div className="space-y-1.5">
              {[
                { val: 0, label: 'Any Rating' },
                { val: 4.5, label: '4.5+ Stars' },
                { val: 4.8, label: '4.8+ Top Rated' }
              ].map((opt) => (
                <label
                  key={opt.val}
                  className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="ratingFilter"
                    checked={minRating === opt.val}
                    onChange={() => setMinRating(opt.val)}
                    className="text-slate-900 focus:ring-slate-900"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={onlyAvailableToday}
                onChange={(e) => setOnlyAvailableToday(e.target.checked)}
                className="rounded text-slate-900 focus:ring-slate-900"
              />
              <span>Available Today</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="rounded text-slate-900 focus:ring-slate-900"
              />
              <span>Only Verified Pros</span>
            </label>
          </div>
        </aside>

        {/* Right Results Column */}
        <main className="lg:col-span-3 space-y-5">
          {/* Bar with Results Count & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-600">
              Showing <strong className="text-slate-950">{filteredWorkers.length}</strong> available professionals
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none"
              >
                <option value="rating">Highest Rated</option>
                <option value="price_asc">Lowest Price / Hr</option>
                <option value="jobs">Most Jobs Completed</option>
              </select>
            </div>
          </div>

          {/* Worker Grid or Empty State */}
          {filteredWorkers.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                <MagnifyingGlass size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                No matching professionals found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your price range, clearing the category filter, or resetting all search parameters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredWorkers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
