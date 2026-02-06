'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFormModal } from '@/context/FormModalContext'
import FAQ from "@/app/Components/FAQ"
import {
  Calendar,
  Globe,
  Building,
  Monitor,
  Clock,
  FileText,
  ArrowLeft,
  Users,
  Award,
  BookOpen,
  Target,
  CheckCircle,
  MapPin,
  ArrowRight,
  Timer,
  TrendingUp,
  CalendarDays,
  GraduationCap
} from 'lucide-react'
import './styles.css'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
}

interface Exam {
  _id: string
  name: string
  slug: string
  short_name: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  hero_section: {
    title: string
    subtitle?: string
    image?: string
  }
  overview: {
    title: string
    content: string
    key_highlights: string[]
  }
  registration: {
    title: string
    description: string
    image?: string
    bullet_points: string[]
  }
  exam_pattern: {
    title: string
    description: string
    total_duration_mins: number
    score_range: string
    table_data: {
      section: string
      questions: number
      duration_mins: number
    }[]
  }
  exam_dates: {
    title: string
    important_dates: {
      event: string
      date: Date
    }[]
  }
  result_statistics: {
    title: string
    description: string
    passing_criteria: string
    total_marks: number
    passing_marks: number
  }
  applicable_countries: Country[]
  is_active: boolean
  display_order: number
  createdAt: string
  updatedAt: string
}

const ExamPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const [exam, setExam] = useState<Exam | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const { openModal } = useFormModal()

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/exams/${slug}`)
        const result = await response.json()

        if (result.success) {
          setExam(result.data)
        } else {
          console.error('Exam not found:', result.message)
        }
      } catch (error) {
        console.error('Error fetching exam:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchExam()
    }
  }, [slug])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'registration', 'pattern', 'dates', 'results', 'faq']

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const isVisible = rect.top <= 100 && rect.bottom >= 100

          if (isVisible) {
            setActiveTab(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Exam...</p>
        </div>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Exam not found</h3>
          <p className="text-slate-500 font-medium">The exam you're looking for doesn't exist.</p>
          <Link href="/exams">
            <Button className="mt-4 bg-green-600 text-black hover:bg-green-700">
              Back to Exams
            </Button>
          </Link>
        </div>
      </div>
    )
  }


  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveTab(sectionId)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'registration', label: 'Registration', icon: Users },
    { id: 'pattern', label: 'Exam Pattern', icon: Timer },
    { id: 'dates', label: 'Exam Date', icon: CalendarDays },
    { id: 'results', label: 'Result statistics', icon: Award },
    { id: 'faq', label: 'FAQs', icon: CheckCircle }
  ]

  const getAvailableTabs = () => {
    return tabs.filter((tab: any) => {
      switch (tab.id) {
        case 'overview': return exam?.overview
        case 'registration': return exam?.registration
        case 'pattern': return exam?.exam_pattern
        case 'dates': return exam?.exam_dates
        case 'results': return exam?.result_statistics
        case 'faq': return true // FAQ is always available
        default: return true
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Tab Navigation - Topmost Position like Navbar */}
      <div className="sticky-tabs">
        <div className="sticky-tabs-container">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {getAvailableTabs().map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`tab-button ${activeTab === tab.id
                      ? 'tab-button-active'
                      : 'tab-button-inactive'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Hero Section - Enhanced Image Design */}
      {exam.hero_section && (
        <div className="relative bg-gradient-to-br from-green-600 to-emerald-700 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white">
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    {exam.exam_type}
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    {exam.exam_mode}
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    {exam.frequency}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
                  {exam.hero_section?.title || exam.name}
                </h1>

                {exam.hero_section?.subtitle && (
                  <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed font-medium">
                    {exam.hero_section.subtitle}
                  </p>
                )}

                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={openModal}
                    className="bg-white text-green-700 hover:bg-green-50 font-black rounded-2xl h-14 px-8 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Get Expert Guidance
                  </Button>
                  <Link href="/exams">
                    <Button
                      variant="outline"
                      className="border-white/30 text-black hover:bg-white/10 font-black rounded-2xl h-14 px-8 text-lg backdrop-blur-sm"
                    >
                      <ArrowLeft className="w-4 h-4 text-black mr-2" />
                      Back to Exams
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                {exam.hero_section.image ? (
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-white/10 backdrop-blur-sm rounded-3xl group-hover:scale-105 transition-transform duration-500" />
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={exam.hero_section.image}
                        alt={exam.name}
                        className="w-full h-80 lg:h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-white/10 backdrop-blur-sm rounded-3xl group-hover:scale-105 transition-transform duration-500" />
                    <div className="relative bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                      <div className="w-full h-80 lg:h-96 flex items-center justify-center">
                        <div className="text-center text-white">
                          <FileText className="w-24 h-24 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium opacity-70">Exam Image</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/exams" className="hover:text-green-600 font-medium">Exams</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">{exam.short_name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-12 main-content-with-tabs">
        <div className="grid grid-cols-1 gap-8">
          {/* Main Content */}
          <div className="col-span-1 space-y-8">

            {/* Overview Section */}
            {exam.overview && (
              <div id="overview" className="scroll-mt-24">
                <Card className="border-none shadow-lg rounded-2xl overflow-hidden mb-8">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-t-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-black">{exam.overview.title}</h2>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="prose prose-lg max-w-none mb-8">
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {exam.overview.content}
                        </p>
                      </div>

                      {exam.overview.key_highlights.length > 0 && (
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-4">Key Highlights</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {exam.overview.key_highlights.map((highlight, index) => (
                              <div key={index} className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <span className="font-semibold text-slate-700">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Registration Section */}
            {exam.registration && (
              <div id="registration" className="scroll-mt-24">
                <Card className="border-0 shadow-xl rounded-3xl mb-8 overflow-hidden bg-white">
                  <CardContent className="p-0">
                    {/* Modern Header */}
                    <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white rounded-t-3xl">
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-xl" />
                      
                      <div className="relative px-8 py-12">
                        <div className="max-w-4xl mx-auto text-center">
                          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-white/30">
                            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
                            <span className="text-sm font-semibold">Registration Process</span>
                          </div>
                          
                          <h2 className="text-4xl font-bold mb-4 tracking-tight">
                            {exam.registration.title}
                          </h2>
                          
                          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            {exam.registration.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Registration Steps */}
                    <div className="px-8 py-12">
                      {exam.registration.bullet_points && exam.registration.bullet_points.length > 0 && (
                        <div className="max-w-4xl mx-auto">
                          <div className="text-center mb-10">
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">
                              Simple Steps to Register
                            </h3>
                            <p className="text-slate-600">Follow these easy steps to complete your registration</p>
                          </div>

                          <div className="grid gap-6">
                            {exam.registration.bullet_points.map((point, index) => (
                              <div key={index} className="group relative">
                                {/* Connection Line */}
                                {index < exam.registration.bullet_points.length - 1 && (
                                  <div className="absolute left-8 top-12 w-0.5 h-6 bg-gradient-to-b from-blue-200 to-transparent" />
                                )}
                                
                                <div className="flex gap-6 p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                                  {/* Step Number */}
                                  <div className="relative flex-shrink-0">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                      <span className="text-xl font-bold text-white">{index + 1}</span>
                                    </div>
                                    {index === 0 && (
                                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white" />
                                    )}
                                  </div>
                                  
                                  {/* Step Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1">
                                        <p className="text-lg font-semibold text-slate-900 leading-relaxed">
                                          {point}
                                        </p>
                                      </div>
                                      
                                      {/* Status Indicator */}
                                      <div className="flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="text-sm font-medium">Complete</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Progress Indicator */}
                          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                  <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900">Ready to get started?</p>
                                  <p className="text-sm text-slate-600">Complete all steps to finish registration</p>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-2xl font-bold text-blue-600">
                                  {exam.registration.bullet_points.length}
                                </p>
                                <p className="text-sm text-slate-600">Total Steps</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Exam Pattern Section */}
            {exam.exam_pattern && (
              <div id="pattern" className="scroll-mt-24">
                <Card className="border-none shadow-lg rounded-2xl mb-8">
                  <CardContent className="p-8 rounded-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                        <Timer className="w-6 h-6 text-purple-600" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-900">{exam.exam_pattern.title}</h2>
                    </div>

                    <p className="text-slate-700 leading-relaxed font-medium mb-6">
                      {exam.exam_pattern.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-6 bg-purple-50 rounded-xl">
                        <Timer className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Duration</p>
                        <p className="text-2xl font-black text-slate-900">{exam.exam_pattern.total_duration_mins} mins</p>
                      </div>
                      <div className="text-center p-6 bg-green-50 rounded-xl">
                        <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Score Range</p>
                        <p className="text-2xl font-black text-slate-900">{exam.exam_pattern.score_range}</p>
                      </div>
                      <div className="text-center p-6 bg-blue-50 rounded-xl">
                        <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total Questions</p>
                        <p className="text-2xl font-black text-slate-900">
                          {exam.exam_pattern?.table_data?.reduce((sum, section) => sum + (Number(section.questions) || 0), 0) || 0}
                        </p>
                      </div>
                    </div>

                    {exam.exam_pattern.table_data.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Section-wise Breakdown</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-slate-50">
                                <th className="text-left p-4 font-bold text-slate-700 border-b border-slate-200">Section</th>
                                <th className="text-center p-4 font-bold text-slate-700 border-b border-slate-200">Questions</th>
                                <th className="text-center p-4 font-bold text-slate-700 border-b border-slate-200">Duration</th>
                              </tr>
                            </thead>
                            <tbody>
                              {exam.exam_pattern.table_data.map((section, index) => (
                                <tr key={index} className="hover:bg-slate-50 transition-colors duration-200">
                                  <td className="p-4 font-medium text-slate-900 border-b border-slate-100">{section.section}</td>
                                  <td className="text-center p-4 text-slate-700 border-b border-slate-100">{section.questions}</td>
                                  <td className="text-center p-4 text-slate-700 border-b border-slate-100">{section.duration_mins} mins</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Exam Dates Section */}
            {exam.exam_dates && (
              <div id="dates" className="scroll-mt-24">
                <Card className="border-none shadow-lg rounded-2xl mb-8">
                  <CardContent className="p-8 rounded-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                        <CalendarDays className="w-6 h-6 text-orange-600" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-900">{exam.exam_dates.title}</h2>
                    </div>

                    {exam.exam_dates.important_dates.length > 0 && (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-orange-50">
                              <th className="text-left p-4 font-bold text-orange-700 border-b border-orange-200">Event</th>
                              <th className="text-center p-4 font-bold text-orange-700 border-b border-orange-200">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {exam.exam_dates.important_dates.map((dateItem, index) => (
                              <tr key={index} className="hover:bg-orange-50 transition-colors duration-200">
                                <td className="p-4 font-medium text-slate-900 border-b border-orange-100">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-orange-600 text-white rounded-lg flex items-center justify-center">
                                      <Calendar className="w-4 h-4" />
                                    </div>
                                    {dateItem.event}
                                  </div>
                                </td>
                                <td className="text-center p-4 font-bold text-orange-600 border-b border-orange-100">
                                  {formatDate(dateItem.date)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}



            {/* Result Statistics Section */}
            {exam.result_statistics && (
              <div id="results" className="scroll-mt-24">
                <Card className="border-none shadow-lg rounded-2xl mb-8">
                  <CardContent className="p-8 rounded-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-900">{exam.result_statistics.title}</h2>
                    </div>

                    <p className="text-slate-700 leading-relaxed font-medium mb-6">
                      {exam.result_statistics.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <div className="text-center p-6 bg-slate-50 rounded-xl">
                        <p className="text-3xl font-black text-slate-900 mb-2">{exam.result_statistics.total_marks}</p>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Marks</p>
                      </div>
                      <div className="text-center p-6 bg-green-50 rounded-xl">
                        <p className="text-3xl font-black text-green-600 mb-2">{exam.result_statistics.passing_marks}</p>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Passing Marks</p>
                      </div>
                      <div className="text-center p-6 bg-blue-50 rounded-xl">
                        <p className="text-3xl font-black text-blue-600 mb-2">
                          {Math.round((exam.result_statistics.passing_marks / exam.result_statistics.total_marks) * 100)}%
                        </p>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Pass Percentage</p>
                      </div>
                      <div className="text-center p-6 bg-purple-50 rounded-xl">
                        <p className="text-lg font-black text-purple-600 mb-2">{exam.result_statistics.passing_criteria}</p>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Criteria</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* FAQ Section */}
            <div id="faq" className="scroll-mt-24">
              <FAQ />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ExamPage
