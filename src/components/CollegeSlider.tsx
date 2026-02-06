'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Building2 } from 'lucide-react'
import CollegeCard from '@/app/Components/CollegeCard'
import { useQuery } from '@tanstack/react-query'

interface College {
  _id: string
  name: string
  slug: string
  banner_url?: string
  fees: number
  duration: string
  establishment_year?: string
  ranking?: string
  about_content: string
  country_ref?: {
    _id: string
    name: string
    slug: string
    flag: string
  }
}

interface CollegeSliderProps {
  countryId?: string // Make optional since we're fetching all colleges
  countrySlug?: string // Add country slug for API filtering
  countryName?: string // Add country name for dynamic header
}

const fetchColleges = async (countrySlug?: string): Promise<College[]> => {
    const url = countrySlug ? `/api/colleges?country=${countrySlug}` : '/api/colleges';
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch colleges')
    }
    
    return result.data.colleges || [];
  };
  
  const CollegeSlider: React.FC<CollegeSliderProps> = ({ countrySlug, countryName }) => {
  const { data: colleges = [], isLoading, isError, error } = useQuery({
    queryKey: ['college-slider', countrySlug],
    queryFn: () => fetchColleges(countrySlug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
  
  // Reset current index when country changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [countrySlug]);
  
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) >= Math.ceil(colleges.length / 3) ? 0 : prev + 1)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1) < 0 ? Math.ceil(colleges.length / 3) - 1 : prev - 1)
  }

  if (isError) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 text-red-500 mx-auto mb-4">
              <Building2 size={48} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Error Loading Colleges</h3>
            <p className="text-slate-500 font-medium">{error?.message}</p>
            <p className="text-slate-500 mt-2">Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Colleges...</p>
          </div>
        </div>
      </div>
    )
  }

  if (colleges.length === 0) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Building2 size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Colleges Available</h3>
            <p className="text-slate-500 font-medium">Check back soon for colleges in this destination.</p>
          </div>
        </div>
      </div>
    )
  }

  const visibleColleges = colleges.slice(currentIndex * 3, (currentIndex + 1) * 3)

  return (
    <div className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Top Colleges in {countryName || 'This Country'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            Explore prestigious universities and colleges offering world-class education
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {colleges.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg border border-slate-200 hover:bg-slate-50 transition-all duration-200 group"
                aria-label="Previous colleges"
              >
                <ChevronLeft size={20} className="text-slate-600 group-hover:text-green-600 transition-colors" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg border border-slate-200 hover:bg-slate-50 transition-all duration-200 group"
                aria-label="Next colleges"
              >
                <ChevronRight size={20} className="text-slate-600 group-hover:text-green-600 transition-colors" />
              </button>
            </>
          )}

          {/* College Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleColleges.map((college: any) => {
              // Safety check - skip if college is not valid
              if (!college || typeof college !== 'object') {
                console.warn('Invalid college data:', college);
                return null;
              }
              
              // Debug log to see the college structure
              console.log('College data:', college);
              
              const cardData = {
                _id: college._id || Math.random().toString(),
                name: typeof college.name === 'string' ? college.name : 'Unknown College',
                slug: typeof college.slug === 'string' ? college.slug : college._id || Math.random().toString(),
                banner_url: college.banner_url,
                location: college.country_ref?.name || 'Unknown Location',
                rank: college.ranking ? `Rank ${college.ranking}` : undefined,
                tuition: college.fees ? `$${college.fees.toLocaleString()}/year` : undefined,
                acceptance: undefined,
                rating: undefined,
                employability: undefined,
                tags: []
              }
              
              // Debug log to see the cardData structure
              console.log('Card data:', cardData);
              
              return <CollegeCard key={college._id || Math.random().toString()} data={cardData} />
            })}
          </div>
        </div>

        {/* Dots Indicator */}
        {colleges.length > 3 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(colleges.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-green-600 w-8' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-green-600 text-white font-black rounded-2xl transition-all duration-300 px-8 py-4 text-lg group">
            View All Colleges
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CollegeSlider
