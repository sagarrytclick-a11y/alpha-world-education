"use client"
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  Heart,
  BookOpen,
  ArrowRight,
  Trophy,
  Calendar,
  Building
} from "lucide-react";
import Link from "next/link";

type College = {
  _id: string;
  name: string;
  location: string;
  type: string;
  overview: string;
  image: string;
  image_url: string;
  slug: string;
  ranking?: string;
  established?: string;
  numberOfCourses?: string;
};

// Custom hook for fetching colleges
const useColleges = () => {
  return useQuery({
    queryKey: ['colleges', 'featured'],
    queryFn: async () => {
      const res = await fetch("/api/colleges");
      const data = await res.json();
      
      if (data.success && Array.isArray(data.colleges)) {
        return data.colleges.slice(0, 6) as College[];
      } else {
        throw new Error("Failed to load colleges");
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export default function FeaturedColleges() {
  const { data: collegeData, isLoading, error, refetch } = useColleges();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-green-50/20 to-slate-50 relative overflow-hidden">
      {/* ... Background Elements same as before ... */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Top</span> Universities
          </h2>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-lg animate-pulse">
                <div className="h-48 sm:h-56 lg:h-64 bg-slate-200"></div>
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                  <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500 mb-4">{error instanceof Error ? error.message : 'Failed to load colleges'}</p>
              <button 
                onClick={() => refetch()} 
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Try again
              </button>
            </div>
          ) : !collegeData || collegeData.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500">No colleges available at the moment.</p>
            </div>
          ) : (
            collegeData.map((college) => (
            <div
              key={college._id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 lg:h-64 w-full overflow-hidden">
                <img 
                  src={college.image_url || college.image || "/placeholder-college.jpg"} 
                  alt={college.name || "College Image"} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Ranking Badge with Default */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg flex items-center gap-1.5 text-xs font-bold">
                  <Trophy size={12} className="text-yellow-400" />
                  Rank {college.ranking || "N/A"}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-5 sm:p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                      {college.type || "General"}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Calendar size={12} />
                      Est. {college.established || "Unknown"}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-green-600 transition-colors line-clamp-1">
                    {college.name || "Institution Name"}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <MapPin size={14} className="text-green-500 flex-shrink-0" />
                    <span className="line-clamp-1">{college.location || "Location not specified"}</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-bold">Courses</p>
                      <p className="text-sm font-bold text-slate-700">{college.numberOfCourses || "0"}+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                   
                   
                  </div>
                </div>

                <p className="text-slate-500 text-sm line-clamp-2 mb-6">
                  {college.overview || "No description available for this institution."}
                </p>

                {/* Action Button */}
                <Link href={`/colleges/${college.slug || "#"}`} className="block">
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition-all group/btn">
                    View College Profile
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          ))
          )}
        </div>

        {/* Explore All Button */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link href="/colleges">
            <button className="flex items-center gap-2 sm:gap-3 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg transform hover:scale-105">
              Explore All Colleges
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}