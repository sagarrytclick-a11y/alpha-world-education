'use client'

import React, { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Globe, Calendar, Building, Clock, FileText, ArrowRight, X, LayoutGrid, AlertCircle, RefreshCw } from 'lucide-react'
import FAQ from "@/app/Components/FAQ"
import { useExams } from '@/hooks/useExams'

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
  is_active: boolean
  display_order: number
}

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedMode, setSelectedMode] = useState<string>('all')

  const { 
    data: exams = [], 
    isLoading, 
    error,
    refetch 
  } = useExams()

  const filteredExams = useMemo(() => {
    let filtered = exams

    if (selectedType !== 'all') {
      filtered = filtered.filter(exam => exam.exam_type === selectedType)
    }

    if (selectedMode !== 'all') {
      filtered = filtered.filter(exam => exam.exam_mode === selectedMode)
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(exam =>
        exam.name.toLowerCase().includes(searchLower) ||
        exam.short_name.toLowerCase().includes(searchLower) ||
        exam.conducting_body.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [exams, searchTerm, selectedType, selectedMode])

  const examTypes = useMemo(() => [...new Set(exams.map(exam => exam.exam_type))], [exams])
  const examModes = useMemo(() => [...new Set(exams.map(exam => exam.exam_mode))], [exams])

  const resetFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedType('all')
    setSelectedMode('all')
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Exams...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to Load Exams</h2>
          <p className="text-slate-500 mb-6">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
          <Button
            onClick={() => refetch()}
            className="bg-green-600 hover:bg-green-700 text-white font-medium"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Header - Same as Colleges */}
      <div className="bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none mb-4 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Testing Excellence
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                ENTRANCE <span className="text-green-600">EXAMS</span>
              </h1>
              <p className="text-slate-500 mt-2 font-medium max-w-md">
                Master your preparation with comprehensive details on global entrance examinations.
              </p>
            </div>
            <div className="bg-white shadow-sm border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{filteredExams.length}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Exams Listed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section - Same Floating Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-green-600" />
              <Input
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-slate-50 border-none h-12 rounded-xl font-medium focus-visible:ring-2 focus-visible:ring-green-500"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl font-medium">
                <SelectValue placeholder="Exam Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {examTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={selectedMode} onValueChange={setSelectedMode}>
              <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl font-medium">
                <SelectValue placeholder="Exam Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                {examModes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              onClick={resetFilters}
              className="h-12 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl font-bold flex gap-2"
            >
              <X size={16} /> Reset Filters
            </Button>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="py-12">
          {filteredExams.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <LayoutGrid size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No exams found</h3>
              <p className="text-slate-500 font-medium">Try different keywords or reset filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExams.map((exam) => (
                <Card key={exam._id} className="group border border-gray-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 py-0 rounded-[2.5rem] overflow-hidden bg-white flex flex-col h-full">
                  {/* Hero Image */}
                  {exam.hero_section?.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={exam.hero_section.image}
                        alt={exam.hero_section.title || exam.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                  <CardHeader className={exam.hero_section?.image ? "p-8 pb-4" : "p-8 pb-4 pt-8"}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shadow-inner">
                        <FileText size={24} />
                      </div>
                      <Badge className="bg-slate-900 text-white hover:bg-slate-900 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        {exam.short_name}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-black text-slate-900 leading-tight group-hover:text-green-600 transition-colors">
                      {exam.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                        {exam.exam_type}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8 pt-0 flex flex-col flex-grow">
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8 font-medium">
                      {exam.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-600 font-bold">
                          <Building size={16} className="text-green-600" />
                          <span className="truncate max-w-[150px]" title={exam.conducting_body}>{exam.conducting_body}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 font-bold">
                          <Calendar size={16} className="text-green-600" />
                          <span>{exam.frequency}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3 border-y border-slate-50">
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-black uppercase border-2 ${exam.exam_mode === 'Online' ? 'border-green-100 text-green-600' : 'border-slate-100 text-slate-500'
                            }`}
                        >
                          Mode: {exam.exam_mode}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link href={`/exams/${exam.slug}`}>
                        <Button className="w-full h-14 bg-slate-900 hover:bg-green-600 text-white font-black rounded-2xl transition-all duration-300 group/btn flex items-center justify-center gap-2">
                          View Full Syllabus
                          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <FAQ />
    </div>
  )
}