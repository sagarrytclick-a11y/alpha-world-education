"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Globe, ArrowRight, GraduationCap, Zap, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const CountryCard = ({ country }: { country: any }) => (
  <Link href={`/countries/${country.slug}`} className="group block h-full">
    <div className="relative bg-white rounded-[1.5rem] sm:rounded-[2rem] border-2 border-slate-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(22,163,74,0.12)] hover:border-green-500 transition-all duration-500 flex flex-col h-full overflow-hidden hover:-translate-y-2">
      
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-green-100 transition-colors duration-500" />

      {/* Header Section */}
      <div className="p-4 sm:p-6 lg:p-8 pb-0 relative">
        <div className="flex items-start justify-between">
          {/* Floating Flag with Ring */}
          <div className="relative">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-xl border border-slate-50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
              {country.flag}
            </div>
            <div className="absolute inset-0 bg-green-200 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>
          
          <div className="bg-green-50 p-2 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
            <Compass size={20} className={country.slug ? "animate-spin-slow" : ""} />
          </div>
        </div>

        <div className="mt-4 sm:mt-6">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {country.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Study Destination</span>
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-4 sm:p-6 lg:p-8 flex-grow flex flex-col">
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 sm:mb-6 font-medium">
          {country.description}
        </p>

        {/* Status Badge */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-8">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Globe size={14} className="text-green-600" />
            <span className="text-[10px] font-black text-slate-600 uppercase">
              {country.is_active ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>

        {/* Modern Footer CTA */}
        <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-tighter">Country Info</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">Explore Opportunities</span>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-green-600 transition-colors shadow-lg">
            <ArrowRight size={18} className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const PopularCountries = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  
  // Update cards per page based on window size
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) {
          setCardsPerPage(3);
        } else if (window.innerWidth >= 768) {
          setCardsPerPage(2);
        } else {
          setCardsPerPage(1);
        }
      }
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);
  
  // Define the fetch function
  const fetchCountries = async () => {
    const response = await fetch('/api/countries', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
      
    const result = await response.json()
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch countries')
    }
      
    // Return only the first 6 countries as per original implementation
    return result.data.slice(0, 6);
  };
  
  const { data: countries = [], isLoading, isError, error } = useQuery({
    queryKey: ['popular-countries'],
    queryFn: fetchCountries,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
  
  // Fallback data in case of error
  const fallbackCountries = [
    { name: 'Australia', flag: '🇦🇺', slug: 'australia', description: 'Experience a high standard of living and world-class education in the Land Down Under.' },
    { name: 'Canada', flag: '🇨🇦', slug: 'canada', description: 'Famous for its diverse culture and friendly immigration policies for international students.' },
    { name: 'United Kingdom', flag: '🇬🇧', slug: 'united-kingdom', description: 'Home to historic institutions and a global hub for innovation and research.' },
    { name: 'United States', flag: '🇺🇸', slug: 'united-states', description: 'Land of opportunity with world-renowned universities and cutting-edge research facilities.' },
    { name: 'Germany', flag: '🇩🇪', slug: 'germany', description: 'Excellent education system with low or no tuition fees for international students.' },
    { name: 'France', flag: '🇫🇷', slug: 'france', description: 'Rich cultural heritage combined with prestigious educational institutions.' }
  ];

  // Use your actual data or these improved fallback objects
  const displayCountries = countries.length > 0 ? countries : fallbackCountries;

  const maxIndex = Math.max(0, displayCountries.length - cardsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) {
        return 0; // Loop back to first slide
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return maxIndex; // Loop to last slide
      }
      return prevIndex - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  if (isError) {
    return (
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-white">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-green-50/30 blur-[120px] rounded-full -z-10" />

        <div className="flex flex-col md:flex-row md:items-center justify-center mb-12 sm:mb-16 gap-6">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-4 sm:mb-6">
              CHOOSE YOUR <br /><span className="text-green-600">DESTINATION</span>
            </h2>
            <p className="text-slate-500 font-semibold text-base sm:text-lg max-w-md mx-auto">
              We help you navigate the best study spots across the globe with expert insights.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-red-500 text-lg">Failed to load countries: {error?.message}</p>
          <p className="text-slate-500 mt-4">Displaying sample countries instead:</p>
        </div>

        {/* Display fallback countries when error occurs */}
        <div className="overflow-hidden mt-8">
          <div className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6">
            {fallbackCountries.map((country, index) => (
              <div key={index} className="w-full flex-shrink-0 md:w-1/2 lg:w-1/3">
                <CountryCard country={country} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-green-50/30 blur-[120px] rounded-full -z-10" />

      <div className="flex flex-col md:flex-row md:items-center justify-center mb-12 sm:mb-16 gap-6">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-4 sm:mb-6">
            CHOOSE YOUR <br /><span className="text-green-600">DESTINATION</span>
          </h2>
          <p className="text-slate-500 font-semibold text-base sm:text-lg max-w-md mx-auto">
            We help you navigate the best study spots across the globe with expert insights.
          </p>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[400px] rounded-[2rem] bg-slate-50 animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <>
            {/* Slider Track */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6"
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)`
                }}
              >
                {displayCountries.map((country: any, index: number) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0"
                    style={{ width: `${100 / cardsPerPage}%` }}
                  >
                    <CountryCard country={country} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg border border-slate-200 hover:bg-green-50 hover:border-green-300 transition-all duration-300 z-10"
              aria-label="Previous country"
            >
              <ChevronLeft size={20} className="text-slate-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg border border-slate-200 hover:bg-green-50 hover:border-green-300 transition-all duration-300 z-10"
              aria-label="Next country"
            >
              <ChevronRight size={20} className="text-slate-700" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(displayCountries.length / cardsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-green-600 w-8' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-16 md:hidden text-center">
        <Link href="/countries" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold">
          See All Countries <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default PopularCountries;