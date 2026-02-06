import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  MapPin, Trophy, DollarSign, Calendar, ArrowUpRight,
  FileText, Award, Clock, CheckCircle, Building2, User, MessageCircle, Eye,
  ArrowRight
} from 'lucide-react';

// --- Interfaces ---

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

interface ExamCardProps {
  name: string;
  short_name?: string;
  exam_type?: string;
  conducting_body?: string;
  exam_mode?: string;
  frequency?: string;
  description?: string;
  slug: string;
}

interface College {
  _id: string;
  name: string;
  slug: string;
  country_ref: any;
  exams: string[];
  fees?: number;
  duration?: string;
  establishment_year?: string;
  ranking?: string | {
    title: string;
    description: string;
    country_ranking: string;
    world_ranking: string;
    accreditation: string[];
  };
  banner_url?: string;
  about_content?: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Exam {
  _id: string;
  name: string;
  slug: string;
  short_name: string;
  exam_type: string;
  conducting_body: string;
  exam_mode: string;
  frequency: string;
  description: string;
  hero_section?: {
    title: string;
    subtitle?: string;
    image?: string;
  };
  is_active: boolean;
  display_order: number;
}

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  author_avatar?: string;
  published_at: string;
  read_time: number;
  views?: number;
  comments?: number;
  slug: string;
  image?: string;
  category?: string;
}

// --- Component 1: University Card (Clean White Design) ---

const UniversityCard = ({ name, image, location, ranking, fees, duration, establishment_year, slug, country, about, exams }: UniversityCardProps) => (
  <Link href={`/colleges/${slug}`} className="group block h-full">
    <div className="relative h-full bg-white border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(22,163,74,0.15)] transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-2">
      
      {/* Image Section with Gradient Overlay */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={image || "/next.svg"} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {ranking && (
          <div className="absolute top-4 right-4 backdrop-blur-md bg-white/90 border border-white text-slate-900 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
            <Trophy size={14} className="text-amber-500 fill-amber-500/20" />
            <span className="text-[11px] font-extrabold uppercase tracking-tight">Rank #{ranking}</span>
          </div>
        )}

        <div className="absolute bottom-3 left-4">
           <div className="flex items-center gap-1.5 text-white/90 text-[10px] font-bold bg-black/20 backdrop-blur-sm px-2 py-1 rounded-md">
            <MapPin size={10} className="text-green-400" />
            <span>{country}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-extrabold text-slate-800 mb-2 leading-tight group-hover:text-green-600 transition-colors line-clamp-2">
            {name}
          </h3>
          {about && (
            <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-2 font-medium opacity-80">
              {about}
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 transition-colors group-hover:bg-green-50/50 group-hover:border-green-100">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1 tracking-wider">Fees (Annual)</p>
            <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
              <div className="p-1 bg-green-100 rounded-md text-green-700">
                <DollarSign size={14} />
              </div>
              <span>${fees?.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 transition-colors group-hover:bg-green-50/50 group-hover:border-green-100">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1 tracking-wider">Duration</p>
            <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
              <div className="p-1 bg-blue-100 rounded-md text-blue-700">
                <Calendar size={14} />
              </div>
              <span>{duration} Years</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Established</span>
            <div className="flex items-center gap-1 text-slate-700 text-xs font-bold">
               {establishment_year}
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-[11px] font-bold shadow-[0_4px_10px_rgba(22,163,74,0.3)] group-hover:bg-green-700 transition-all active:scale-95">
            APPLY NOW <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </div>
  </Link>
);
// --- Component 2: Exam Card (High Contrast Design) ---

const ExamCard = ({ name, short_name, exam_type, conducting_body, exam_mode, frequency, description, slug }: ExamCardProps) => (
  <Link href={`/exams/${slug}`} className="group block h-full">
    <div className="relative h-full bg-white rounded-xl border-2 border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(22,163,74,0.12)] hover:border-green-400 transition-all duration-500 flex flex-col p-6 overflow-hidden hover:-translate-y-1">

      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 rounded-bl-full -mr-12 -mt-12 group-hover:bg-blue-100/50 transition-colors duration-500" />

      {/* Header Section */}
      <div className="flex items-start justify-between mb-4 relative">
        {/* Floating Icon */}
        <div className="relative">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-lg border border-slate-50 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500 relative z-10">
            <FileText size={24} />
          </div>
          <div className="absolute inset-0 bg-blue-200 blur-xl opacity-15 group-hover:opacity-30 transition-opacity" />
        </div>

        <div className="bg-blue-50 p-1.5 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
          <Award size={16} className={slug ? "animate-spin-slow" : ""} />
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight group-hover:text-green-600 transition-colors">
          {short_name || name}
        </h3>
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>{exam_type}</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold mb-3">
          <Building2 size={12} className="text-green-500" />
          <span className="uppercase">{conducting_body}</span>
        </div>

        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Dynamic Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
            <Calendar size={12} className="text-blue-600" />
            <span className="text-[9px] font-black text-slate-600 uppercase">{exam_mode}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
            <Clock size={12} className="text-green-600" />
            <span className="text-[9px] font-black text-slate-600 uppercase">{frequency}</span>
          </div>
        </div>
      </div>

      {/* Modern Footer CTA */}
      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[9px] font-black text-slate-900 group-hover:text-green-600 transition-colors uppercase tracking-wider">
          Exam Guide
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-green-600 transition-colors shadow-md">
          <ArrowUpRight size={14} />
        </div>
      </div>
    </div>
  </Link>
);

// --- Component 3: Blog Card (Modern Design) ---

const BlogCard = ({ title, excerpt, author, author_avatar, published_at, read_time, views, comments, slug, image, category }: BlogCardProps) => (
  <Link href={`/blog/${slug}`} className="group block h-full">
    <div className="relative bg-white rounded-xl border-4 border-slate-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(22,163,74,0.12)] hover:border-green-500 transition-all duration-500 flex flex-col h-full overflow-hidden hover:-translate-y-2">

      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-purple-100 transition-colors duration-500" />

      {/* Header Section */}
      <div className="p-8 pb-0 relative">
        <div className="flex items-start justify-between">
          {/* Floating Icon with Ring */}
          <div className="relative">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-xl border border-slate-50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
              📝
            </div>
            <div className="absolute inset-0 bg-purple-200 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>

          <div className="bg-purple-50 p-2 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
            <FileText size={20} className={slug ? "animate-spin-slow" : ""} />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-black text-slate-900 leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{category || 'Article'}</span>
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-bold mb-4">
          <User size={14} className="text-purple-500" />
          <span className="uppercase">{author}</span>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
          {excerpt}
        </p>

        {/* Dynamic Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Calendar size={14} className="text-purple-600" />
            <span className="text-[10px] font-black text-slate-600 uppercase">{published_at}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Clock size={14} className="text-green-600" />
            <span className="text-[10px] font-black text-slate-600 uppercase">{read_time} min read</span>
          </div>
        </div>

        {/* Modern Footer CTA */}
        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Engagement</span>
            <span className="text-sm font-bold text-slate-900">
              {views && `${views} views`}
              {views && comments && ' • '}
              {comments && `${comments} comments`}
              {!views && !comments && 'Read more'}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-green-600 transition-colors shadow-lg">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// --- Universities Section Component ---

const UniversitiesSection = ({
  universities,
  allUniversities,
  loading,
  loadingMore,
  loadMoreUniversities
}: {
  universities: UniversityCardProps[];
  allUniversities: UniversityCardProps[];
  loading: boolean;
  loadingMore: boolean;
  loadMoreUniversities: () => void;
}) => (
  <section className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
        FEATURED <span className="text-green-600">COLLEGES</span>
      </h2>
      <p className="text-slate-500 font-medium text-lg">
        World-class education for your bright future.
      </p>
    </div>

    {/* Loading State */}
    {loading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-slate-200 h-52 rounded-[2.5rem] mb-4" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {universities.map((uni, i) => (
            <UniversityCard key={i} {...uni} />
          ))}
        </div>

        {/* Load More / View All Buttons */}
        <div className="text-center mt-12 space-y-4">
          {universities.length < allUniversities.length && (
            <button
              onClick={loadMoreUniversities}
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
                  Load More Colleges
                  <ArrowUpRight size={20} />
                </>
              )}
            </button>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-slate-500 text-sm">
              Showing {universities.length} of {allUniversities.length} colleges
            </span>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors"
            >
              View All Colleges
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </>
    )}
  </section>
);

// --- Exams Section Component ---

const ExamsSection = ({
  exams,
  allExams,
  loading,
  loadingMore,
  loadMoreExams
}: {
  exams: ExamCardProps[];
  allExams: ExamCardProps[];
  loading: boolean;
  loadingMore: boolean;
  loadMoreExams: () => void;
}) => (
  <section className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
        TOP <span className="text-green-600">EXAMS</span>
      </h2>
      <p className="text-slate-500 font-medium text-lg">
        Clear your path to international admissions.
      </p>
    </div>

    {/* Loading State */}
    {loading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-slate-200 h-48 rounded-[2.5rem] mb-4" />
            <div className="p-8 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-3 bg-slate-200 rounded w-full" />
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 rounded w-2/3" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {exams.map((exam, i) => (
            <ExamCard key={i} {...exam} />
          ))}
        </div>

        {/* Load More / View All Buttons */}
        <div className="text-center mt-12 space-y-4">
          {exams.length < allExams.length && (
            <button
              onClick={loadMoreExams}
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
                  Load More Exams
                  <ArrowUpRight size={20} />
                </>
              )}
            </button>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-slate-500 text-sm">
              Showing {exams.length} of {allExams.length} exams
            </span>
            <Link
              href="/exams"
              className="inline-flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors"
            >
              View All Exams
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </>
    )}
  </section>
);

// --- Custom Hooks ---

const useFeaturedData = () => {
  // Fetch colleges
  const { 
    data: collegesData, 
    isLoading: collegesLoading, 
    error: collegesError 
  } = useQuery({
    queryKey: ['featured-colleges'],
    queryFn: async () => {
      const response = await fetch('/api/colleges');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch colleges');
      }
      return result.data.colleges || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  // Fetch exams
  const { 
    data: examsData, 
    isLoading: examsLoading, 
    error: examsError 
  } = useQuery({
    queryKey: ['featured-exams'],
    queryFn: async () => {
      const response = await fetch('/api/exams');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch exams');
      }
      return result.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  // Transform colleges data
  const universities = React.useMemo(() => {
    if (!collegesData) return [];
    
    return collegesData.map((college: College) => ({
      name: college.name,
      image: college.banner_url || '',
      location: college.country_ref?.city || '',
      ranking: typeof college.ranking === 'object' && college.ranking?.country_ranking 
        ? `Country #${college.ranking.country_ranking}${college.ranking.world_ranking ? ` | World #${college.ranking.world_ranking}` : ''}`
        : college.ranking,
      fees: college.fees,
      duration: college.duration,
      establishment_year: college.establishment_year,
      slug: college.slug,
      country: college.country_ref?.name,
      about: college.about_content
    }));
  }, [collegesData]);

  // Transform exams data
  const exams = React.useMemo(() => {
    if (!examsData) return [];
    
    return examsData.map((exam: Exam) => ({
      name: exam.name,
      short_name: exam.short_name,
      exam_type: exam.exam_type,
      conducting_body: exam.conducting_body,
      exam_mode: exam.exam_mode,
      frequency: exam.frequency,
      description: exam.description,
      slug: exam.slug
    }));
  }, [examsData]);

  const isLoading = collegesLoading || examsLoading;
  const error = collegesError || examsError;

  return {
    universities,
    exams,
    isLoading,
    error
  };
};

// --- Main Section Component ---

export default function FeaturedSection() {
  const { universities, exams, isLoading, error } = useFeaturedData();
  
  const [universitiesDisplayCount, setUniversitiesDisplayCount] = React.useState(6);
  const [examsDisplayCount, setExamsDisplayCount] = React.useState(6);

  const loadMoreUniversities = () => {
    setUniversitiesDisplayCount(prev => prev + 6);
  };

  const loadMoreExams = () => {
    setExamsDisplayCount(prev => prev + 6);
  };

  // Slice data for display
  const displayedUniversities = universities.slice(0, universitiesDisplayCount);
  const displayedExams = exams.slice(0, examsDisplayCount);

  if (error) {
    console.error('Featured section error:', error);
    return (
      <div className="space-y-24 py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-red-500 font-bold">Failed to load featured content</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-24 py-24 bg-white overflow-hidden">
      <UniversitiesSection
        universities={displayedUniversities}
        allUniversities={universities}
        loading={isLoading}
        loadingMore={false}
        loadMoreUniversities={loadMoreUniversities}
      />
      <ExamsSection
        exams={displayedExams}
        allExams={exams}
        loading={isLoading}
        loadingMore={false}
        loadMoreExams={loadMoreExams}
      />
    </div>
  );
}