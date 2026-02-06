"use client";

import { useState } from "react";
import { Filter, MapPin, DollarSign, Award, ChevronDown, X } from "lucide-react";

const countries = [
  "United Kingdom", "United States", "Canada", "Australia",
  "Germany", "Netherlands", "Ireland", "New Zealand"
];

const tuitionRanges = [
  "Under $15,000", "$15,000 - $25,000", "$25,000 - $40,000", "$40,000+"
];

const rankings = [
  "Top 50", "Top 100", "Top 200", "Top 500"
];

export default function FiltersSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedTuition, setSelectedTuition] = useState<string[]>([]);
  const [selectedRankings, setSelectedRankings] = useState<string[]>([]);

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const toggleTuition = (range: string) => {
    setSelectedTuition(prev =>
      prev.includes(range)
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };

  const toggleRanking = (ranking: string) => {
    setSelectedRankings(prev =>
      prev.includes(ranking)
        ? prev.filter(r => r !== ranking)
        : [...prev, ranking]
    );
  };

  const clearAllFilters = () => {
    setSelectedCountries([]);
    setSelectedTuition([]);
    setSelectedRankings([]);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium hover:border-green-300 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Filter size={18} />
            <span>Filters</span>
            {(selectedCountries.length + selectedTuition.length + selectedRankings.length > 0) && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {selectedCountries.length + selectedTuition.length + selectedRankings.length}
              </span>
            )}
          </div>
          <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} size={18} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'} bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Filter size={20} className="text-green-500" />
            Filters
          </h3>
          {(selectedCountries.length + selectedTuition.length + selectedRankings.length > 0) && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-slate-500 hover:text-green-500 transition-colors flex items-center gap-1"
            >
              <X size={14} />
              Clear all
            </button>
          )}
        </div>

        {/* Country Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-green-500" />
            <label className="font-semibold text-slate-700">Country</label>
          </div>
          <div className="space-y-2">
            {countries.map((country) => (
              <label key={country} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCountries.includes(country)}
                  onChange={() => toggleCountry(country)}
                  className="w-4 h-4 text-green-500 border-slate-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                  {country}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Tuition Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={16} className="text-green-500" />
            <label className="font-semibold text-slate-700">Annual Tuition</label>
          </div>
          <div className="space-y-2">
            {tuitionRanges.map((range) => (
              <label key={range} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedTuition.includes(range)}
                  onChange={() => toggleTuition(range)}
                  className="w-4 h-4 text-green-500 border-slate-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                  {range}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Ranking Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Award size={16} className="text-green-500" />
            <label className="font-semibold text-slate-700">QS Ranking</label>
          </div>
          <div className="space-y-2">
            {rankings.map((ranking) => (
              <label key={ranking} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedRankings.includes(ranking)}
                  onChange={() => toggleRanking(ranking)}
                  className="w-4 h-4 text-green-500 border-slate-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                  {ranking}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl hover:scale-105">
          Apply Filters
        </button>
      </div>
    </>
  );
}
