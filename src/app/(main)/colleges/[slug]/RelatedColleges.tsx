'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCountryName } from "@/lib/normalize"

import { Button } from '@/components/ui/button'
import {
  MapPin,
  DollarSign,
  Clock,
  GraduationCap,
  ArrowRight
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

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
  fees_structure?: {
    title: string
    description: string
    courses: { course_name: string; duration: string; annual_tuition_fee: string }[]
  }
}

interface RelatedCollegesProps {
  currentCollegeSlug: string
}

const fetchRelatedColleges = async (slug: string): Promise<College[]> => {
    const response = await fetch(`/api/colleges/${slug}/related`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch related colleges')
    }
    
    return result.data;
  };
  
  export default function RelatedColleges({ currentCollegeSlug }: RelatedCollegesProps) {
  const { data: colleges = [], isLoading, isError, error } = useQuery({
    queryKey: ['related-colleges', currentCollegeSlug],
    queryFn: () => fetchRelatedColleges(currentCollegeSlug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return (
      <div className="text-center py-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[3rem] border-2 border-dashed border-slate-200">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">Error Loading Related Colleges</h3>
        <p className="text-slate-500 mb-4">{error?.message}</p>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Please try again later or explore our complete collection of top-ranked universities
        </p>
        <Link href="/colleges">
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl h-14 flex items-center gap-3 transition-all duration-300 group">
            Explore All Colleges
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group">
            <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 rounded-[2rem] overflow-hidden animate-pulse">
              <div className="absolute inset-0 bg-slate-200 animate-pulse" />
              <div className="absolute top-4 left-4 w-24 h-6 bg-white/80 rounded-full animate-pulse" />
            </div>
            <div className="p-6 bg-white rounded-b-[2rem] shadow-sm">
              <div className="h-6 bg-slate-200 rounded-lg mb-3 animate-pulse" />
              <div className="h-4 bg-slate-100 rounded-lg mb-4 w-3/4 animate-pulse" />
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="h-10 bg-slate-100 rounded-xl animate-pulse" />
                <div className="h-10 bg-slate-100 rounded-xl animate-pulse" />
              </div>
              <div className="h-12 bg-slate-900 rounded-2xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (colleges.length === 0) {
    return (
      <div className="text-center py-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[3rem] border-2 border-dashed border-slate-200">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">No Related Colleges Found</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Explore our complete collection of top-ranked universities worldwide
        </p>
        <Link href="/colleges">
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl h-14 flex items-center gap-3 transition-all duration-300 group">
            Explore All Colleges
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {colleges.map((college) => {
        const country = college.country_ref
        const countryName = getCountryName(college.country_ref)
        const countryFlag = typeof country === 'object' ? country.flag : ''

        return (
          <div key={college._id} className="group">
            <div className="relative overflow-hidden rounded-t-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 bg-white">
              <div className="relative h-48 w-full overflow-hidden rounded-t-[2rem]">
                <img
                  src={college.banner_url || `https://picsum.photos/seed/${college.slug}/400/300`}
                  alt={college.name}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Ranking Badge */}
                {college.ranking && (
                  <div className="absolute top-4 right-4">
                    {typeof college.ranking === 'object' ? (
                      <Badge className="bg-yellow-500 text-white border-none px-3 py-1 rounded-full text-xs font-black">
                        #{college.ranking.country_ranking || college.ranking.world_ranking}
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500 text-white border-none px-3 py-1 rounded-full text-xs font-black">
                        #{college.ranking}
                      </Badge>
                    )}
                  </div>
                )}
                
                {/* Country Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-sm text-slate-900 border-none px-3 py-1 rounded-full text-xs font-black">
                    {getCountryName(college.country_ref)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-b-[2rem] shadow-sm">
              <h3 className="font-bold text-xl text-slate-900 mb-4 line-clamp-2 leading-tight">
                {college.name}
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Yearly Fees</span>
                  <div className="flex items-center text-green-600 font-black text-lg">
                    <DollarSign size={16} />
                    <span>
                      {college.fees 
                        ? `$${college.fees.toLocaleString()}`
                        : college.fees_structure?.courses?.[0]?.annual_tuition_fee || 'N/A'
                      }
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
                  <div className="flex items-center text-slate-700 font-black text-lg">
                    <Clock size={16} className="mr-1 text-slate-400" />
                    <span>
                      {college.duration || college.fees_structure?.courses?.[0]?.duration || 'N/A'} years
                    </span>
                  </div>
                </div>
              </div>

              <Link href={`/colleges/${college.slug}`} className="block">
                <Button className="w-full h-14 bg-slate-900 hover:bg-green-600 text-white font-black rounded-2xl transition-all duration-300 group/btn flex items-center justify-center gap-2">
                  View Program Details
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
