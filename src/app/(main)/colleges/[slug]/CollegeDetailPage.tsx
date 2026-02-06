'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFormModal } from '@/context/FormModalContext'
import FAQ from "@/app/Components/FAQ"
import { SITE_CONTACT } from '@/config/site-config'
import { useContactInfo } from "@/hooks/useContactInfo";
import { useCollege } from '@/hooks/useColleges'

import {
  MapPin,
  GraduationCap,
  DollarSign,
  Clock,
  Award,
  Calendar,
  Phone,
  Mail,
  Globe,
  Users,
  BookOpen,
  CheckCircle,
  Star,
  TrendingUp,
  ArrowRight,
  Building,
  FileText,
  Shield,
  Target,
  Zap,
  ChevronRight,
  Info,
  University,
  Camera,
  Trophy,
  Globe2,
  Languages,
  Briefcase,
  Heart,
  Lightbulb,
  Compass,
  Flag,
  CreditCard,
  Library,
  Wifi,
  Bus,
  Coffee,
  Dumbbell,
  Utensils,
  Home,
  TreePine,
  Sparkles,
  Medal,
  Bookmark,
  Share2,
  Download,
  ExternalLink,
  ArrowUpRight,
  ChevronUp
} from 'lucide-react'
import RelatedColleges from './RelatedColleges'

interface College {
  _id: string
  name: string
  slug: string
  country_ref: any
  exams: string[]
  fees?: number
  duration?: string
  establishment_year?: string
  ranking?: string | {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  banner_url?: string
  about_content?: string
  is_active: boolean
  createdAt: string
  updatedAt: string

  // Comprehensive structure fields
  overview?: {
    title: string
    description: string
  }
  key_highlights?: {
    title: string
    description: string
    features: string[]
  }
  why_choose_us?: {
    title: string
    description: string
    features: { title: string; description: string }[]
  }
  admission_process?: {
    title: string
    description: string
    steps: string[]
  }
  documents_required?: {
    title: string
    description: string
    documents: string[]
  }
  fees_structure?: {
    title: string
    description: string
    courses: { course_name: string; duration: string; annual_tuition_fee: string }[]
  }
  campus_highlights?: {
    title: string
    description: string
    highlights: string[]
  }
}

interface CollegeDetailPageProps {
  slug: string
}

const CollegeDetailPage: React.FC<CollegeDetailPageProps> = ({ slug }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { openModal } = useFormModal()

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll spy effect to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'overview',
        'key-highlights',
        'why-choose',
        'ranking',
        'admission-process',
        'entrance-exams',
        'documents-required',
        'fees-structure',
        'campus-highlights',
      ];

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { phones, emails } = useContactInfo();

  // Use TanStack Query for college data
  const {
    data: college,
    isLoading,
    error,
    refetch
  } = useCollege(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading College...</p>
        </div>
      </div>
    )
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {error instanceof Error && error.message === 'College not found' ? 'College Not Found' : 'Failed to Load College'}
          </h2>
          <p className="text-slate-500 mb-6">
            {error instanceof Error ? error.message : 'The college you are looking for does not exist.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => refetch()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Try Again
            </Button>
            <Link href="/colleges">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Browse All Colleges
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[400px] sm:min-h-[500px] bg-slate-50 overflow-hidden py-8 sm:py-12 md:py-20">
        {/* Abstract background shapes for "Flow" feel */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-900 skew-x-[-12deg] translate-x-20 hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* LEFT SIDE: CONTENT */}
            <div className="order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 sm:px-4 py-1.5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Flag className="w-3 h-3" />
                  {college.country_ref?.name || 'International'}
                </Badge>

                {college.ranking && (
                  <div className="flex gap-2">
                    <Badge className="bg-yellow-500 text-white border-none px-3 sm:px-4 py-1.5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-yellow-200">
                      <Trophy className="w-3 h-3" />
                      Ranked #{typeof college.ranking === 'object' ? college.ranking.country_ranking : college.ranking}
                    </Badge>
                  </div>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-4 sm:mb-6">
                {college.name}
                <span className="text-blue-600">.</span>
              </h1>

              {/* Hero Description with Expand/Collapse */}
              <div className="relative mb-6 sm:mb-8">
                <div
                  className={`relative overflow-hidden ${mounted ? 'transition-all duration-700 ease-in-out' : ''} ${mounted && isExpanded ? 'max-h-[200px]' : mounted ? 'max-h-[80px]' : 'max-h-none'
                    }`}
                >
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-500 font-medium max-w-none sm:max-w-xl leading-relaxed border-l-4 border-blue-600 pl-4 sm:pl-6">
                    {college.overview?.description || college.about_content}
                  </p>

                  {/* Gradient Overlay - Only visible when collapsed and mounted */}
                  {mounted && !isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent z-10" />
                  )}
                </div>

                {/* More/Less Toggle Button - Only show after mount */}
                {mounted && (
                  <div className="mt-3 pl-4 sm:pl-6">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="group flex items-center gap-2 font-black text-xs uppercase tracking-widest transition-all"
                    >
                      <span className="relative">
                        {isExpanded ? 'Show Less' : 'Show More'}
                        {/* Animated underline */}
                        {/* <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300" /> */}
                      </span>

                      <div className={`w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:text-white transition-all duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ArrowRight className="w-3 h-3" />
                        )}
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-4 sm:py-6 border-y border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white shadow-md rounded-xl flex items-center justify-center text-blue-600">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-700">{college.country_ref?.name || 'Global'}</p>
                  </div>
                </div>

                {college.establishment_year && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white shadow-md rounded-xl flex items-center justify-center text-purple-600">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Founded</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-700">{college.establishment_year}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white shadow-md rounded-xl flex items-center justify-center text-emerald-600">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Community</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-700">Intl. Students</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: IMAGE WITH DIRECTIONAL FLOW */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative z-20 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[4px] sm:border-[8px] border-white group">
                <img
                  src={college.banner_url || `https://picsum.photos/seed/${college.slug}/800/1000`}
                  alt={college.name}
                  className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Floating Badge on Image */}
                <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6 right-3 sm:right-4 lg:right-6 p-3 sm:p-4 lg:p-6 bg-white/90 backdrop-blur-md rounded-[1rem] sm:rounded-[1.5rem] lg:rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-center sm:text-left">
                    <p className="text-[8px] sm:text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Ready to start?</p>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-900 font-black">Admissions Open 2026</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center text-white">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </div>
                </div>
              </div>

              {/* Background Decorative "Arrow" Shape */}
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 lg:-bottom-10 lg:-right-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-600/10 rounded-full blur-3xl -z-10" />
            </div>

          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg">
        <div className="max-w-none px-0 sm:px-0 md:px-0 lg:px-0">
          <div className="flex items-center justify-center gap-1 py-2 sm:py-3 overflow-x-auto scrollbar-hide scroll-smooth">
            {[
              { name: 'Overview', id: 'overview' },
              { name: 'Key Highlights', id: 'key-highlights' },
              { name: 'Why Choose ?', id: 'why-choose' },
              { name: 'Ranking', id: 'ranking' },
              { name: 'Admission Process', id: 'admission-process' },
              { name: 'Eligibility', id: 'entrance-exams' },
              { name: 'Documents', id: 'documents-required' },
              { name: 'Fees', id: 'fees-structure' },
              { name: 'Campus', id: 'campus-highlights' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  const element = document.getElementById(tab.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`flex items-center gap-2 px-4 sm:px-4 md:px-4 lg:px-6 py-2.5 text-sm font-semibold rounded-lg sm:rounded-xl transition-all duration-300 whitespace-nowrap group relative overflow-hidden shrink-0 min-w-max ${activeTab === tab.id
                    && 'text-white bg-green-600 border border-green-200'
                  }`}
              >
                <span className="relative z-10 text-sm">
                  {tab.name}
                </span>
                {/* Animated background on hover */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl" /> */}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* About Section */}
            <div id="overview">
              <Card className="border-none shadow-lg sm:shadow-2xl rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="bg-white px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-2">
                  <div className="flex flex-col gap-2">
                    <Badge className="w-fit bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-2 sm:px-3 py-1 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
                      Institution
                    </Badge>
                    <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 flex items-center gap-2 sm:gap-3 tracking-tighter">
                      <Info className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-600 fill-emerald-600/10" />
                      {college.overview?.title || 'About the Institution'}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-6 lg:p-8 relative">
                  {/* Text Container with dynamic height and transition */}
                  <div
                    className={`relative overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[2000px]' : 'max-h-[160px]'
                      }`}
                  >
                    <p className="text-sm sm:text-base lg:text-lg text-slate-500 leading-relaxed font-medium border-l-4 border-emerald-500 pl-4 sm:pl-6">
                      {college.overview?.description || college.about_content}
                    </p>

                    {/* Sleek Gradient Overlay - Only visible when collapsed */}
                    {!isExpanded && (
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
                    )}
                  </div>

                  {/* The Interactive Toggle Button */}
                  <div className="mt-4 sm:mt-6 pl-0">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="group w-full flex items-center justify-between px-6 py-4 text-emerald-600 font-black text-xs uppercase tracking-widest hover:text-emerald-700 hover:bg-emerald-50 transition-all rounded-xl border border-emerald-100"
                    >
                      <span className="relative flex items-center gap-3">
                        {isExpanded ? 'Show Less' : 'Show More'}
                        {/* Animated underline */}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-500 group-hover:w-full transition-all duration-300" />
                      </span>

                      <div className={`w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ArrowRight className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Trust Footer - Subtly indicates data freshness */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-50 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Updated for 2026 Academic Session
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Information */}
            <div id="key-highlights">
              {/* Key Information - Executive Dashboard Style */}
              <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="bg-white px-8 pt-10 pb-2">
                  <div className="flex flex-col gap-2">
                    <Badge className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                      Essentials
                    </Badge>
                    <CardTitle className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                      <Target className="w-8 h-8 text-blue-600 fill-blue-600/10" />
                      Key Information
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      // Mapping your data into a clean structure for the UI
                      {
                        show: !!college.fees || (college.fees_structure?.courses && college.fees_structure.courses.length > 0),
                        label: "Annual Fees",
                        value: college.fees ? `$${college.fees.toLocaleString()}` : college.fees_structure?.courses?.[0]?.annual_tuition_fee,
                        sub: "Academic investment",
                        icon: DollarSign,
                        color: "emerald"
                      },
                      {
                        show: !!(college.duration || college.fees_structure?.courses?.[0]?.duration),
                        label: "Program Duration",
                        value: `${college.duration || college.fees_structure?.courses?.[0]?.duration} Years`,
                        sub: "Full-time study",
                        icon: Clock,
                        color: "blue"
                      },
                      {
                        show: !!college.establishment_year,
                        label: "Established",
                        value: college.establishment_year,
                        sub: "Legacy of excellence",
                        icon: Calendar,
                        color: "purple"
                      },
                      {
                        show: true,
                        label: "Location",
                        value: college.country_ref?.name || 'International',
                        sub: "Campus residence",
                        icon: MapPin,
                        color: "orange"
                      }
                    ].map((item, i) => item.show && (
                      <div
                        key={i}
                        className="group relative flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                      >
                        <div className="flex items-center gap-5">
                          {/* Dynamic Icon Container */}
                          <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-${item.color}-600 transition-all duration-300`}>
                            <item.icon className={`w-6 h-6 text-${item.color}-600 group-hover:text-white transition-colors`} />
                          </div>

                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-slate-500 transition-colors">
                              {item.label}
                            </span>
                            <span className={`text-xl font-black text-slate-900 tracking-tight group-hover:text-${item.color}-700 transition-colors`}>
                              {item.value}
                            </span>
                            <span className="text-xs font-medium text-slate-400">
                              {item.sub}
                            </span>
                          </div>
                        </div>

                        {/* Directional Arrow Path */}
                        <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                          <ArrowRight className={`w-5 h-5 text-${item.color}-600`} />
                          <div className={`h-1.5 w-1.5 rounded-full bg-${item.color}-600 animate-pulse`} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Trust Line */}
                  <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                      <Shield className="w-3 h-3" /> 100% Verified University Data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Entrance Exams */}
            <div id="entrance-exams">
              {college.exams && college.exams.length > 0 && (
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="bg-white px-8 pt-10 pb-2">
                    <div className="flex flex-col gap-2">
                      <Badge className="w-fit bg-purple-100 text-purple-700 hover:bg-purple-100 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        Eligibility
                      </Badge>
                      <CardTitle className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                        <BookOpen className="w-8 h-8 text-purple-600 fill-purple-600/10" />
                        Accepted Entrance Exams
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    <div className="mb-10 max-w-2xl border-l-4 border-purple-500 pl-6">
                      <p className="text-slate-500 leading-relaxed text-lg font-medium">
                        The following standardized tests are recognized for admission. Ensure your scores are within the valid timeframe for your intake.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {college.exams.map((exam, index) => (
                        <div
                          key={exam}
                          className="group relative flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-transparent hover:border-purple-200 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                        >
                          <div className="flex items-center gap-4">
                            {/* Exam Icon Container */}
                            <div className="relative">
                              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-purple-600 transition-colors duration-300">
                                <FileText className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                              </div>
                              {/* Micro-arrow indicator */}
                              <div className="absolute -right-1 -top-1 w-3 h-3 bg-purple-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 border-2 border-white" />
                            </div>

                            <div>
                              <span className="text-slate-900 font-black text-lg tracking-tight block">
                                {exam}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Official Score Required
                              </span>
                            </div>
                          </div>

                          {/* Directional Path Animation */}
                          <div className="flex items-center gap-3 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <div className="h-[1px] w-8 bg-purple-200 hidden lg:block" />
                            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                              <ArrowRight className="w-4 h-4 text-purple-600" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pro-Tip with Arrow Element */}
                    <div className="mt-8 relative overflow-hidden bg-slate-900 rounded-[2rem] p-6 text-white group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <BookOpen size={100} />
                      </div>

                      <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Zap className="w-6 h-6 text-purple-400 fill-purple-400/20" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-black text-sm uppercase tracking-widest mb-1 text-purple-400">Preparation Tip</h5>
                          <p className="text-slate-300 text-sm font-medium leading-relaxed">
                            Not sure which exam to take? Our counselors can help you choose the test that best aligns with your academic strengths.
                          </p>
                        </div>
                        <button
                          onClick={openModal}
                          className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-tighter hover:bg-purple-500 hover:text-white transition-all"
                        >
                          Consult Expert <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Key Highlights */}
            <div id="key-highlights">
              {college.key_highlights?.features && college.key_highlights.features.length > 0 && (
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="bg-white px-8 pt-10 pb-2">
                    <div className="flex flex-col gap-2">
                      <Badge className="w-fit bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        At a Glance
                      </Badge>
                      <CardTitle className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                        <Sparkles className="w-8 h-8 text-yellow-600 fill-yellow-600/10" />
                        {college.key_highlights.title || 'Key Highlights'}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    {college.key_highlights.description && (
                      <p className="text-slate-500 leading-relaxed text-lg mb-10 max-w-2xl font-medium border-l-4 border-yellow-500 pl-6">
                        {college.key_highlights.description}
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {college.key_highlights.features.map((feature, index) => (
                        <div
                          key={index}
                          className="group relative flex items-start gap-5 p-4 rounded-2xl transition-all duration-300 hover:bg-yellow-50/50"
                        >
                          {/* Spotlight Icon with Arrow indicator */}
                          <div className="relative flex-shrink-0 mt-1">
                            <div className="w-10 h-10 bg-white border border-yellow-100 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-yellow-500 group-hover:border-yellow-500 transition-all duration-300">
                              <Star className="w-5 h-5 text-yellow-600 group-hover:text-white group-hover:fill-white transition-colors" />
                            </div>

                            {/* Subtle directional "ray" on hover */}
                            <div className="absolute top-1/2 -right-2 w-4 h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-700 font-bold leading-snug group-hover:text-slate-900 transition-colors">
                                {feature}
                              </span>

                              {/* Minimalist Arrow Path */}
                              <ArrowRight className="w-4 h-4 text-yellow-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                          </div>

                          {/* Bottom "Flow" line */}
                          <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-slate-100 group-hover:bg-yellow-200 transition-colors" />
                        </div>
                      ))}
                    </div>

                    {/* Trust Badge Footer */}
                    <div className="mt-12 flex items-center gap-6 p-6 rounded-[2rem] bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-xl shadow-yellow-200">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-black text-lg leading-tight uppercase tracking-tight">Prime Educational Standard</h4>
                        <p className="text-yellow-100 text-sm font-medium">This institution meets all international quality benchmarks for excellence.</p>
                      </div>
                      <div className="ml-auto hidden lg:block">
                        <div className="w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-5 h-5 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Why Choose Us */}
            <div id="why-choose">
              {college.why_choose_us?.features && college.why_choose_us.features.length > 0 && (
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="bg-white px-8 pt-10 pb-2">
                    <div className="flex flex-col gap-2">
                      <Badge className="w-fit bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        Benefits
                      </Badge>
                      <CardTitle className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                        <Heart className="w-8 h-8 text-green-600 fill-green-600/10" />
                        {college.why_choose_us.title || 'Why Choose Us'}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    {college.why_choose_us.description && (
                      <p className="text-slate-500 leading-relaxed text-lg mb-10 max-w-2xl font-medium border-l-4 border-green-500 pl-6">
                        {college.why_choose_us.description}
                      </p>
                    )}

                    <div className="relative space-y-6">
                      {/* The Vertical "Arrow Path" Line */}
                      <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-green-500/50 via-green-200 to-transparent hidden md:block" />

                      {college.why_choose_us.features.map((feature, index) => (
                        <div
                          key={index}
                          className="group relative flex items-start gap-6 p-6 rounded-3xl transition-all duration-500 hover:bg-slate-50 hover:translate-x-2"
                        >
                          {/* Step Icon with Arrow Circle */}
                          <div className="relative z-10 flex-shrink-0">
                            <div className="w-14 h-14 bg-white border-2 border-green-500 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-green-600 group-hover:border-green-600 transition-all duration-300">
                              <Lightbulb className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                            </div>

                            {/* Animated Floating Arrow */}
                            <div className="absolute -right-2 -bottom-2 w-7 h-7 bg-slate-900 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Content with directional cue */}
                          <div className="flex-1 pt-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-black text-slate-900 text-xl tracking-tight group-hover:text-green-700 transition-colors">
                                {feature.title}
                              </h4>
                              {/* Visual Arrow underline/lead */}
                              <div className="h-[2px] w-0 bg-green-500 group-hover:w-12 transition-all duration-500" />
                            </div>
                            <p className="text-slate-600 leading-relaxed font-medium">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Ranking & Recognition */}
            <div id="ranking">
              {college.ranking && typeof college.ranking === 'object' && (
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="bg-white px-8 pt-10 pb-2">
                    <div className="flex flex-col gap-2">
                      <Badge className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        Recognition
                      </Badge>
                      <CardTitle className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                        <Medal className="w-8 h-8 text-blue-600 fill-blue-600/10" />
                        {college.ranking.title || 'Ranking & Recognition'}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    {college.ranking.description && (
                      <p className="text-slate-500 leading-relaxed text-lg mb-10 max-w-2xl font-medium border-l-4 border-blue-500 pl-6">
                        {college.ranking.description}
                      </p>
                    )}

                    {/* Rankings Grid with Arrow Connectors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                      {[
                        {
                          val: typeof college.ranking === 'object' ? college.ranking.country_ranking : undefined,
                          label: "Country Ranking",
                          sub: "National Excellence",
                          icon: Trophy,
                          color: "yellow"
                        },
                        {
                          val: typeof college.ranking === 'object' ? college.ranking.world_ranking : undefined,
                          label: "World Ranking",
                          sub: "Global Standing",
                          icon: Globe2,
                          color: "blue"
                        }
                      ].map((item, i) => item.val && (
                        <div key={i} className="group relative bg-slate-50 rounded-[2rem] p-8 transition-all duration-500 hover:bg-white hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-slate-100">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-${item.color}-600 transition-all duration-300`}>
                              <item.icon className={`w-7 h-7 text-${item.color}-600 group-hover:text-white transition-colors`} />
                            </div>
                            <div className={`text-5xl font-black text-${item.color}-600/20 group-hover:text-${item.color}-600/10 transition-colors`}>
                              #{item.val}
                            </div>
                          </div>

                          <div className="relative">
                            <h4 className="text-2xl font-black text-slate-900 tracking-tight">#{item.val}</h4>
                            <p className="text-slate-600 font-bold uppercase text-xs tracking-widest">{item.label}</p>

                            {/* Sleek Arrow Indicator */}
                            <div className="mt-4 flex items-center gap-2">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter group-hover:text-slate-900 transition-colors">View Methodology</span>
                              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-2 group-hover:text-slate-900 transition-all" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Accreditations - Pill Style */}
                    {college.ranking.accreditation && college.ranking.accreditation.length > 0 && (
                      <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-8 text-white">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                          <Shield size={80} />
                        </div>

                        <div className="relative z-10">
                          <h4 className="font-black text-lg mb-6 flex items-center gap-3">
                            <Award className="w-6 h-6 text-blue-400" />
                            Official Accreditations
                          </h4>

                          <div className="flex flex-wrap gap-3">
                            {college.ranking.accreditation.map((acc, index) => (
                              <div
                                key={index}
                                className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-white/20 transition-all cursor-default"
                              >
                                <CheckCircle className="w-4 h-4 text-blue-400" />
                                <span className="text-sm font-bold tracking-tight">{acc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Admission Process */}
            <div id="admission-process">
              {college.admission_process?.steps && college.admission_process.steps.length > 0 && (
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="bg-white px-8 pt-10 pb-2">
                    <div className="flex flex-col gap-2">
                      <Badge className="w-fit bg-purple-100 text-purple-700 hover:bg-purple-100 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        Step-by-Step
                      </Badge>
                      <CardTitle className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                        <Calendar className="w-8 h-8 text-purple-600 fill-purple-600/10" />
                        {college.admission_process.title || 'Admission Process'}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    {college.admission_process.description && (
                      <p className="text-slate-500 leading-relaxed text-lg mb-10 max-w-2xl font-medium border-l-4 border-purple-500 pl-6">
                        {college.admission_process.description}
                      </p>
                    )}

                    <div className="relative space-y-4">
                      {/* The Vertical Path Line */}
                      <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-500 via-purple-200 to-transparent hidden md:block" />

                      {college.admission_process.steps.map((step, index) => (
                        <div
                          key={index}
                          className="group relative flex items-center gap-6 p-5 rounded-3xl transition-all duration-500 hover:bg-purple-50/50 hover:translate-x-3"
                        >
                          {/* Step Number with Arrow Logic */}
                          <div className="relative z-10 flex-shrink-0">
                            <div className="w-14 h-14 bg-white border-2 border-purple-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:border-purple-600 group-hover:bg-purple-600 transition-all duration-300">
                              <span className="text-xl font-black text-purple-600 group-hover:text-white transition-colors">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                            </div>

                            {/* Floating Arrow that appears on hover */}
                            <div className="absolute -right-2 -bottom-2 w-7 h-7 bg-slate-900 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Step Content */}
                          <div className="flex-1">
                            <div className="flex items-center gap-4">
                              <p className="text-slate-700 font-bold text-lg leading-tight group-hover:text-slate-900 transition-colors">
                                {step}
                              </p>
                              {/* Visual "connector" arrow line */}
                              <div className="hidden lg:block h-[1px] flex-1 bg-gradient-to-r from-purple-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                          </div>

                          {/* Final Touch: A small "Next" cue for all steps except the last one */}
                          {college.admission_process && index !== college.admission_process.steps.length - 1 && (
                            <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight className="w-5 h-5 text-purple-300 animate-pulse" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Instant Action Footer */}
                    <div className="mt-10 p-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-purple-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                          <Zap className="w-6 h-6 fill-white" />
                        </div>
                        <div>
                          <h5 className="text-white font-black text-lg">Confused about the steps?</h5>
                          <p className="text-purple-100 text-sm">Let our experts handle the paperwork for you.</p>
                        </div>
                      </div>
                      <Button
                        onClick={openModal}
                        className="bg-white text-purple-700 hover:bg-purple-50 font-black px-8 py-6 rounded-2xl shadow-lg transition-transform hover:scale-105"
                      >
                        Get Free Assistance
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Documents Required */}
            <div id="documents-required">
              {college.documents_required?.documents && college.documents_required.documents.length > 0 && (
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="bg-white px-8 pt-10 pb-2">
                    <div className="flex flex-col gap-2">
                      <Badge className="w-fit bg-orange-100 text-orange-700 hover:bg-orange-100 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        Checklist
                      </Badge>
                      <CardTitle className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                        <FileText className="w-8 h-8 text-orange-600 fill-orange-600/10" />
                        {college.documents_required.title || 'Documents Required'}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    {college.documents_required.description && (
                      <p className="text-slate-500 leading-relaxed text-lg mb-10 max-w-2xl font-medium border-l-4 border-orange-500 pl-6">
                        {college.documents_required.description}
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {college.documents_required.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="group relative flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-transparent hover:border-orange-200 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className="flex items-center gap-4">
                            {/* Icon Container */}
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-orange-600 transition-colors duration-300">
                              <Shield className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                            </div>

                            <span className="text-slate-700 font-bold tracking-tight group-hover:text-slate-900 transition-colors">
                              {doc}
                            </span>
                          </div>

                          {/* Directional Arrow Path Element */}
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                            <span className="text-[10px] font-black text-orange-600 uppercase tracking-tighter">Required</span>
                            <ArrowRight className="w-4 h-4 text-orange-600" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Verification Notice */}
                    <div className="mt-8 flex items-start gap-4 p-6 bg-orange-50/50 rounded-[2rem] border border-orange-100/50">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Info className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-black text-slate-900 uppercase tracking-wider">Verification Tip</p>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          Ensure all documents are clear, scanned in high resolution, and translated into English if required by the university.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Fees Structure */}
            <div id="fees-structure">
              {college.fees_structure?.courses && college.fees_structure.courses.length > 0 && (
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="bg-white px-8 pt-10 pb-2">
                    <div className="flex flex-col gap-2">
                      <Badge className="w-fit bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        Investment
                      </Badge>
                      <CardTitle className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                        <DollarSign className="w-8 h-8 text-emerald-600 fill-emerald-600/10" />
                        {college.fees_structure.title || 'Fees Structure'}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    {college.fees_structure.description && (
                      <p className="text-slate-500 leading-relaxed text-lg mb-10 max-w-2xl font-medium border-l-4 border-emerald-500 pl-6">
                        {college.fees_structure.description}
                      </p>
                    )}

                    <div className="space-y-4">
                      {college.fees_structure.courses.map((course, index) => (
                        <div
                          key={index}
                          className="group relative bg-slate-50 rounded-3xl p-1 border border-transparent hover:border-emerald-200 hover:bg-white hover:shadow-xl transition-all duration-500"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">

                            {/* Course Info */}
                            <div className="flex items-center gap-5 flex-1">
                              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-emerald-600 transition-colors duration-300">
                                <GraduationCap className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <h4 className="font-black text-slate-900 text-xl tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                                  {course.course_name}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {course.duration} Program
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Fee Value with Directional Arrow */}
                            <div className="flex items-center gap-6 bg-white md:bg-transparent p-4 md:p-0 rounded-2xl border md:border-none border-slate-100">
                              <div className="hidden lg:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">Annual Fee</span>
                                <ArrowRight className="w-4 h-4 text-emerald-600" />
                              </div>

                              <div className="text-right">
                                <p className="text-3xl font-black text-emerald-600 tracking-tighter">
                                  {course.annual_tuition_fee}
                                </p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                                  Tuition / Year
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Subtle "Arrow-Path" Line at bottom of hover */}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-emerald-500 group-hover:w-1/3 transition-all duration-500 rounded-full" />
                        </div>
                      ))}
                    </div>

                    {/* Trust Quote */}
                    <div className="mt-8 flex items-center justify-center gap-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <Shield className="w-4 h-4 text-slate-400" />
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Transparent Pricing • No Hidden Charges • Scholarship Options Available
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Campus Highlights */}
            <div id="campus-highlights">
              {college.campus_highlights?.highlights && college.campus_highlights.highlights.length > 0 && (
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="bg-white px-8 pt-10 pb-2">
                    <div className="flex flex-col gap-2">
                      <Badge className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        Lifestyle & Facilities
                      </Badge>
                      <CardTitle className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                        <Building className="w-8 h-8 text-blue-600 fill-blue-600/10" />
                        {college.campus_highlights.title || 'Campus Highlights'}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    {college.campus_highlights.description && (
                      <p className="text-slate-500 leading-relaxed text-lg mb-10 max-w-2xl font-medium border-l-4 border-blue-500 pl-6">
                        {college.campus_highlights.description}
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {college.campus_highlights.highlights.map((highlight, index) => {
                        // Dynamic Icon Mapping Logic (Keep your existing function, just wrap in UI)
                        const getIcon = (text: string) => {
                          const lowerText = text.toLowerCase();
                          if (lowerText.includes('wifi')) return <Wifi className="w-5 h-5" />;
                          if (lowerText.includes('library')) return <Library className="w-5 h-5" />;
                          if (lowerText.includes('gym') || lowerText.includes('sport')) return <Dumbbell className="w-5 h-5" />;
                          if (lowerText.includes('food') || lowerText.includes('cafe')) return <Utensils className="w-5 h-5" />;
                          if (lowerText.includes('hostel')) return <Home className="w-5 h-5" />;
                          return <Zap className="w-5 h-5" />;
                        };

                        return (
                          <div
                            key={index}
                            className="group relative flex items-center gap-4 p-4 pr-6 rounded-2xl bg-slate-50 border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                          >
                            {/* Icon with "Pulse" effect on hover */}
                            <div className="relative flex-shrink-0">
                              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition-all duration-300">
                                <div className="text-blue-600 group-hover:text-white transition-colors">
                                  {getIcon(highlight)}
                                </div>
                              </div>
                              {/* Visual Arrow "Tip" */}
                              <div className="absolute -right-1 -top-1 w-3 h-3 bg-blue-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 border-2 border-white" />
                            </div>

                            <div className="flex-1 flex items-center justify-between">
                              <span className="text-slate-700 font-bold tracking-tight group-hover:text-slate-900 transition-colors">
                                {highlight}
                              </span>

                              {/* Directional Arrow Path */}
                              <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-600 transition-all duration-300" />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Campus Tour CTA */}
                    <button
                      onClick={openModal}
                      className="mt-10 w-full group relative overflow-hidden bg-slate-900 rounded-2xl p-5 text-white transition-all hover:bg-blue-700"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        <Globe className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
                        <span className="font-black uppercase tracking-widest text-xs">Request a Virtual Campus Tour</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                      {/* Animated background arrow pattern */}
                      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center rotate-12 scale-150">
                        <ArrowRight size={200} />
                      </div>
                    </button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right Column - CTA and Related */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            {/* CTA Card */}
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700 text-white">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-4">Ready to Apply?</h3>
                  <p className="text-green-100 mb-6">Get expert guidance for your admission process</p>
                  <div className="space-y-3">
                    <button
                      onClick={openModal}
                      className="w-full bg-white text-green-700 font-black rounded-xl hover:bg-green-50 transition-all duration-300 py-4 px-6 flex items-center justify-center gap-2 group"
                    >
                      <Bookmark className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Start Application
                    </button>
                    <button
                      onClick={openModal}
                      className="w-full bg-white/20 backdrop-blur-sm text-white font-black rounded-xl hover:bg-white/30 transition-all duration-300 py-4 px-6 border border-white/30 flex items-center justify-center gap-2 group"
                    >
                      <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Get Free Consultation
                    </button>
                  </div>



                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 font-medium">{phones.primary}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 font-medium">{emails.info}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 font-medium">Global Opportunities</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Colleges */}
        <div className="mt-16">
          <RelatedColleges currentCollegeSlug={college.slug} />
        </div>
      </div>

      <FAQ />
    </div>
  )
}

export default CollegeDetailPage
