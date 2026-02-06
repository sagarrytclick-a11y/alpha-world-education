import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Trophy, DollarSign, Calendar, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface UniversityCardProps {
  name: string;
  image: string;
  location: string;
  ranking?: string;
  fees?: number;
  duration?: string;
  establishment_year?: string;
  slug: string;
  country?: string;
  about?: string;
  exams?: string[];
}

const UniversityCard = ({ name, image, location, ranking, fees, duration, establishment_year, slug, country, about, exams }: UniversityCardProps) => {
  return (
    <Link href={`/colleges/${slug}`} className="group block h-full">
      <div className="relative h-full bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col">
        
        {/* Image Section - Clean, no text overlay */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/next.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          
          {/* Floating Glass Rank Badge */}
          {ranking && (
            <div className="absolute top-4 right-4 backdrop-blur-md bg-white/70 border border-white/50 text-slate-800 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
              <Trophy size={14} className="text-orange-500" />
              <span className="text-xs font-bold">Rank #{ranking}</span>
            </div>
          )}
        </div>

        {/* Content Section - All info in the white space */}
        <div className="p-6 flex flex-col flex-grow">
          
          {/* 1. Header: Name & Location */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-green-600 transition-colors capitalize">
              {name}
            </h3>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
              <MapPin size={14} className="text-green-500" />
              <span>{location}, {country}</span>
            </div>
          </div>

          {/* 2. Short About Snippet */}
          {about && (
            <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-5 border-l-2 border-green-100 pl-3">
              {about}
            </p>
          )}

          {/* 3. Detailed Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Annual Tuition</p>
              <div className="flex items-center gap-1 text-slate-800 font-bold text-sm">
                <DollarSign size={14} className="text-green-600" />
                <span>${fees?.toLocaleString()}</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Duration</p>
              <div className="flex items-center gap-1 text-slate-800 font-bold text-sm">
                <Calendar size={14} className="text-green-600" />
                <span>{duration} years</span>
              </div>
            </div>
          </div>

          {/* 4. Accepted Exams Tags */}
          {exams && exams.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {exams.slice(0, 3).map((exam, i) => (
                <span key={i} className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                  <CheckCircle2 size={10} />
                  {exam}
                </span>
              ))}
            </div>
          )}

          {/* 5. Footer: Establishment & CTA */}
          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
              <Building2 size={12} />
              <span>EST. {establishment_year}</span>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-bold group/btn">
              Learn More
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const fetchUniversities = async (): Promise<UniversityCardProps[]> => {
    const response = await fetch('/api/colleges', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch universities')
    }
    
    // Transform API data to match UniversityCard interface
    return result.data.map((university: any) => ({
      name: university.name,
      image: university.banner_url || "/next.svg",
      location: university.city || "Location",
      ranking: university.ranking,
      fees: university.fees,
      duration: university.duration,
      establishment_year: university.establishment_year,
      slug: university.slug,
      country: university.country_ref?.name || "Country",
      about: university.about_content,
      exams: university.exams || []
    }));
  };
  
  export default function FeaturedUniversities() {
  const { data: allUniversities = [], isLoading, isError, error } = useQuery({
    queryKey: ['featured-universities'],
    queryFn: fetchUniversities,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
  
  const [displayCount, setDisplayCount] = React.useState(6);
  const [loadingMore, setLoadingMore] = React.useState(false);
  
  // Slice universities based on display count
  const universities = allUniversities.slice(0, displayCount);

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      
      const newDisplayCount = displayCount + 6;
      setDisplayCount(newDisplayCount);
    } catch (error) {
      console.error("Failed to load more universities:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-4">
          Featured <span className="text-green-600">Universities</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Explore prestigious institutions worldwide and find your perfect academic fit.
        </p>
      </div>

      {/* Error State */}
      {isError ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Failed to load universities: {error?.message}</p>
          <p className="text-slate-500 mt-2">Please try again later.</p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-slate-200 h-48 rounded-t-[2rem] mb-4" />
              <div className="p-6 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
                <div className="h-3 bg-slate-200 rounded w-full" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-8 bg-slate-200 rounded" />
                  <div className="h-8 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universities.map((university, index) => (
              <UniversityCard key={index} {...university} />
            ))}
          </div>

          {/* Load More / View All Buttons */}
          <div className="text-center mt-12 space-y-4">
            {!isLoading && universities.length < allUniversities.length && (
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Load More
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            )}
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-slate-500 text-sm">
                Showing {universities.length} of {allUniversities.length} universities
              </span>
              <Link 
                href="/colleges" 
                className="inline-flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors"
              >
                View All Colleges
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}