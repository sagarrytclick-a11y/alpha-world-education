"use client";

import { useState, useEffect } from "react";
import { Search, Star, Globe, TrendingUp } from "lucide-react";

export default function SearchHero({ onSearch }: { onSearch?: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-white via-green-50/30 to-green-50/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-100 rounded-full blur-[150px] opacity-30" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-200 rounded-full blur-[120px] opacity-20" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Star size={14} className="fill-white" />
            Trusted by 50,000+ students worldwide
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-6">
            Find Your Dream{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">
              University
            </span>{" "}
            Abroad
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-3xl text-lg sm:text-xl text-slate-600 leading-relaxed mb-8">
            Explore <strong className="text-green-600">500+ top-ranked universities</strong> worldwide.
            Filter by rankings, location, and fees to find perfect match for your career goals.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative mx-auto max-w-2xl mb-8">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by university name, course, or country..."
              className="w-full rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm py-4 pl-12 pr-16 text-slate-900 placeholder-slate-500 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all shadow-lg hover:shadow-xl"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-2 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Search
            </button>
          </form>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Globe size={16} className="text-green-500" />
              <span className="font-semibold">25+ Countries</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <TrendingUp size={16} className="text-green-500" />
              <span className="font-semibold">500+ Universities</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Star size={16} className="text-green-500" />
              <span className="font-semibold">Top QS Rankings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
