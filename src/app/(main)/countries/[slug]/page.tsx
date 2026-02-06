'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CollegeSlider from '@/components/CollegeSlider'
import { useFormModal } from '@/context/FormModalContext'
import FAQ from "@/app/Components/FAQ"
import { 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Wallet, 
  FileCheck, 
  Briefcase, 
  ArrowRight,
  Info,
  CheckCircle2,
  ArrowLeft,
  FileText
} from 'lucide-react'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
  description: string
  meta_title?: string
  meta_description?: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

const CountryPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const { openModal } = useFormModal()

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/countries/${slug}`)
        const result = await response.json()
        
        if (result.success) {
          setCountry(result.data)
        } else {
          console.error('Country not found:', result.message)
        }
      } catch (error) {
        console.error('Error fetching country:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchCountry()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Country...</p>
        </div>
      </div>
    )
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Country not found</h3>
          <p className="text-slate-500 font-medium">The country you're looking for doesn't exist.</p>
          <Link href="/countries">
            <Button className="mt-4 bg-green-600 hover:bg-green-700">
              Back to Countries
            </Button>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <div className="relative bg-slate-900 pt-32 pb-48 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,#22c55e_0%,transparent_50%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link href="/countries">
            <Button variant="ghost" className="mb-6 text-white/70 font-bold flex gap-2">
              <ArrowLeft size={16} />
              Back to Countries
            </Button>
          </Link>
          
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
              <span className="text-2xl">{country.flag}</span>
              <span className="text-white font-black tracking-widest uppercase text-sm">Study Abroad Destination</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              Study in <span className="text-green-400">{country.name}</span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
              {country.description}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Safety Rank", val: "#12", icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" },
            { label: "Monthly Cost", val: "$400", icon: Wallet, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Visa Rate", val: "98%", icon: FileCheck, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Part-time Work", val: "Allowed", icon: Briefcase, color: "text-orange-600", bg: "bg-orange-50" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-xl rounded-[2rem]">
              <CardContent className="p-8 flex flex-col items-center">
                <div className={`${stat.bg} p-4 rounded-2xl mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-2xl font-black text-slate-900">{stat.val}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-4xl font-black text-slate-900 mb-6 flex items-center gap-4">
                <Info className="w-10 h-10 text-green-500" />
                Why {country.name}?
              </h2>
              <div className="prose prose-lg max-w-none text-slate-600 font-medium leading-relaxed">
                {country.description}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "MCI & WHO Approved Medical Colleges",
                "English Medium Curriculum",
                "Direct Admission - No Entrance Exam",
                "European Standard of Living",
                "High Quality Clinical Rotation",
                "Easy PR & Settlement Options"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-[1.5rem] shadow-sm border border-slate-100">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="font-bold text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="space-y-6">
            <Card className="border-none bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] overflow-hidden text-white">
              <CardContent className="p-10">
                <h3 className="text-3xl font-black mb-4">Start Your Application</h3>
                <p className="text-slate-400 mb-8 font-medium">Get a free consultation with our experts regarding universities in {country.name}.</p>
                <div className="space-y-4">
                  <Button 
                    onClick={openModal}
                    className="w-full h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black text-lg group"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="w-full h-14 rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 font-black">
                    Download Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* <div className="p-8 bg-green-50 rounded-[2.5rem] border border-green-100">
              <h4 className="font-black text-green-900 mb-2">Need Help?</h4>
              <p className="text-green-700 text-sm font-medium mb-4">Speak to our {country.name} admission specialist today.</p>
              <div className="font-black text-xl text-green-600">+1 (555) GEORGIA</div>
            </div> */}
          </div>

        </div>
      </div>

      {/* Colleges Slider Section */}
      <CollegeSlider countrySlug={country.slug} countryName={country.name} />
      <FAQ />
    </div>
  )
}

export default CountryPage