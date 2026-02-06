"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MapPin, Trophy, DollarSign, Calendar, ArrowUpRight, 
  FileText, Award, Clock, CheckCircle, Building2, User, MessageCircle, Eye,
  Globe, GraduationCap, Zap, Compass
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

interface CountryCardProps {
  name: string;
  flag: string;
  slug: string;
  description: string;
  is_active: boolean;
}

// --- University Card Component ---

const UniversityCard = ({ name, image, location, ranking, fees, duration, establishment_year, slug, country, about }: UniversityCardProps) => (
  <Link href={`/colleges/${slug}`} className="group block h-full">
    <div className="relative h-full bg-white rounded-xl border-2 border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(22,163,74,0.12)] hover:border-green-400 transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-1">
      <div className="relative h-40 w-full overflow-hidden">
        <img src={image || "/next.svg"} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        {ranking && (
          <div className="absolute top-3 right-3 backdrop-blur-md bg-white/70 border border-white/50 text-slate-800 px-2 py-1 rounded-xl flex items-center gap-1.5 shadow-sm">
            <Trophy size={12} className="text-orange-500" />
            <span className="text-[10px] font-bold">Rank #{ranking}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-lg font-black text-slate-900 mb-1 leading-tight group-hover:text-green-600 transition-colors uppercase">{name}</h3>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
            <MapPin size={12} className="text-green-500" />
            <span>{location}, {country}</span>
          </div>
        </div>

        {about && <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3 border-l-2 border-green-100 pl-2 italic">{about}</p>}

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100/50">
            <p className="text-[9px] text-slate-400 uppercase font-black mb-1">Annual Fee</p>
            <div className="flex items-center gap-1 text-slate-900 font-bold text-xs">
              <DollarSign size={12} className="text-green-600" />
              <span>${fees?.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100/50">
            <p className="text-[9px] text-slate-400 uppercase font-black mb-1">Duration</p>
            <div className="flex items-center gap-1 text-slate-900 font-bold text-xs">
              <Calendar size={12} className="text-green-600" />
              <span>{duration}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1 text-slate-400 text-[9px] font-black tracking-widest uppercase">
            <Building2 size={10} /> EST. {establishment_year}
          </div>
          <div className="flex items-center gap-1 text-green-600 text-[10px] font-black group/btn">
            VIEW DETAILS <ArrowUpRight size={12} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// --- Exam Card Component ---

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

// --- Blog Card Component ---

const BlogCard = ({ title, excerpt, author, published_at, read_time, views, comments, slug, category }: BlogCardProps) => (
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
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// --- Country Card Component ---

const CountryCard = ({ country }: { country: CountryCardProps }) => (
  <Link href={`/countries/${country.slug}`} className="group block h-full">
    <div className="relative bg-white rounded-[2rem] border-2 border-slate-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(22,163,74,0.12)] hover:border-green-500 transition-all duration-500 flex flex-col h-full overflow-hidden hover:-translate-y-2">
      
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-green-100 transition-colors duration-500" />

      {/* Header Section */}
      <div className="p-8 pb-0 relative">
        <div className="flex items-start justify-between">
          {/* Floating Flag with Ring */}
          <div className="relative">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-xl border border-slate-50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
              {country.flag}
            </div>
            <div className="absolute inset-0 bg-green-200 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>
          
          <div className="bg-green-50 p-2 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
            <Compass size={20} className={country.slug ? "animate-spin-slow" : ""} />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-black text-slate-900 leading-tight">
            {country.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Study Destination</span>
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-8 flex-grow flex flex-col">
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
          {country.description}
        </p>

        {/* Status Badge */}
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Globe size={14} className="text-green-600" />
            <span className="text-[10px] font-black text-slate-600 uppercase">
              {country.is_active ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>

        {/* Modern Footer CTA */}
        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Country Info</span>
            <span className="text-sm font-bold text-slate-900">Explore Opportunities</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-green-600 transition-colors shadow-lg">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// --- Main Showcase Component ---

export default function CardShowcase() {
  // Sample data for demonstration
  const universities: UniversityCardProps[] = [
    {
      name: "Stanford University",
      image: "/next.svg",
      location: "Stanford",
      ranking: "2",
      fees: 56000,
      duration: "4 years",
      establishment_year: "1885",
      slug: "stanford",
      country: "USA",
      about: "Leading research university known for innovation and entrepreneurship."
    },
    {
      name: "MIT",
      image: "/next.svg", 
      location: "Cambridge",
      ranking: "1",
      fees: 58000,
      duration: "4 years",
      establishment_year: "1861",
      slug: "mit",
      country: "USA",
      about: "Premier institution for science, technology, and engineering."
    }
  ];

  const exams: ExamCardProps[] = [
    {
      name: "Graduate Record Examination",
      short_name: "GRE",
      exam_type: "Standardized Test",
      conducting_body: "ETS",
      exam_mode: "Computer-based",
      frequency: "Year-round",
      description: "Standardized test for graduate school admissions in the US.",
      slug: "gre"
    },
    {
      name: "International English Language Testing System",
      short_name: "IELTS",
      exam_type: "Language Proficiency",
      conducting_body: "British Council",
      exam_mode: "Paper/Computer",
      frequency: "Multiple times/month",
      description: "Test of English language proficiency for non-native speakers.",
      slug: "ielts"
    }
  ];

  const blogs: BlogCardProps[] = [
    {
      title: "Complete Guide to Studying Abroad in 2024",
      excerpt: "Everything you need to know about applying to universities abroad, from choosing the right country to securing scholarships.",
      author: "Sarah Johnson",
      published_at: "Jan 15, 2024",
      read_time: 8,
      views: 1250,
      comments: 23,
      slug: "study-abroad-guide-2024",
      category: "Guide"
    },
    {
      title: "Top 10 Scholarships for International Students",
      excerpt: "Discover the best scholarship opportunities available for international students looking to study overseas.",
      author: "Michael Chen",
      published_at: "Jan 10, 2024", 
      read_time: 6,
      views: 890,
      comments: 15,
      slug: "top-scholarships-2024",
      category: "Scholarships"
    }
  ];

  const countries: CountryCardProps[] = [
    {
      name: "Australia",
      flag: "🇦🇺",
      slug: "australia",
      description: "Experience a high standard of living and world-class education in the Land Down Under.",
      is_active: true
    },
    {
      name: "Canada", 
      flag: "🇨🇦",
      slug: "canada",
      description: "Famous for its diverse culture and friendly immigration policies for international students.",
      is_active: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-6">
          CARD <span className="text-green-600">SHOWCASE</span>
        </h1>
        <p className="text-slate-500 font-semibold text-lg max-w-3xl">
          Explore our complete collection of card components designed for modern education platforms.
        </p>
      </div>

      {/* Universities Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-100">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
            FEATURED <span className="text-green-600">UNIVERSITIES</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            World-class education for your bright future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((uni, i) => (
            <UniversityCard key={i} {...uni} />
          ))}
        </div>
      </section>

      {/* Exams Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-100">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
            TOP <span className="text-green-600">EXAMS</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Clear your path to international admissions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map((exam, i) => (
            <ExamCard key={i} {...exam} />
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-100">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
            LATEST <span className="text-green-600">ARTICLES</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Insights and guides for your educational journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <BlogCard key={i} {...blog} />
          ))}
        </div>
      </section>

      {/* Countries Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-100">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
            POPULAR <span className="text-green-600">DESTINATIONS</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Choose your study destination from around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country, i) => (
            <CountryCard key={i} country={country} />
          ))}
        </div>
      </section>
    </div>
  );
}
