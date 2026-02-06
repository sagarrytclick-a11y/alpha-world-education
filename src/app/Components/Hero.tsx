"use client";

import React from 'react';
import { Check, ArrowRight, Play, Star, ShieldCheck, GraduationCap, Globe2, BookOpen } from 'lucide-react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-white pt-20 pb-16 sm:pt-15 sm:pb-15 overflow-hidden">
      
      {/* Subtle Background Elements to fill white space */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 hidden lg:block -skew-x-6 translate-x-32" />
      <div className="absolute top-40 left-10 w-64 h-64 bg-green-50 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT COLUMN (7/12) - More Text & Info */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-6">
              <ShieldCheck size={16} className="text-green-600" />
              <span className="text-xs font-black text-green-700 uppercase tracking-widest">Study Abroad Consultancy</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
              Your Dream University <br />
              <span className="relative inline-block text-green-600">
                Awaits You
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none">
                  <path d="M3 9C118.5 3 234 3 355 9" stroke="#16A34A" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed font-medium mb-8">
              Complete study abroad guidance from <span className="text-slate-900 font-bold">university selection to visa approval</span>. 
              We help you get admitted to top universities in 50+ countries.
            </p>

            {/* Service Categories */}
            <div className="mb-10">
              <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Our Services Include</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 sm:gap-x-8 w-full max-w-lg">
                {[
                  { icon: BookOpen, text: "University Admissions" },
                  { icon: ShieldCheck, text: "Visa Application Support" },
                  { icon: GraduationCap, text: "Scholarship Guidance" },
                  { icon: Globe2, text: "Pre-Departure Briefing" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <item.icon size={14} className="text-green-600" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-8 sm:mb-12 w-full sm:w-auto">
              <Link href="/countries" className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                <GraduationCap className="w-4 h-4" />
                Find Your University 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                  <Play size={16} fill="currentColor" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-900">Free Consultation</span>
              </button>
            </div>

            {/* Bottom Mini-Stats */}
            <div className="flex items-center gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-slate-100 w-full justify-center lg:justify-start">
               <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">15,000+</span>
                  <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Students Helped</span>
               </div>
               <div className="flex flex-col border-x border-slate-100 px-4 sm:px-8">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">800+</span>
                  <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Partner Universities</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">98%</span>
                  <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Success Rate</span>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5/12) - Balanced Image Size */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-full max-w-[350px] sm:max-w-[450px]">
              
              {/* Image with Decorative Frame */}
              <div className="relative z-10 rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-[6px] sm:border-[10px] border-white shadow-2xl rotate-2 aspect-[4/5]">
                <img
                  src="/Hero/herosection.png"
                  alt="Student Success"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Success Badge (Smaller & Clean) */}
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-white z-[10] p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-50 flex flex-col items-center animate-bounce-slow">
                 <div className="bg-green-100 p-1.5 sm:p-2 rounded-full mb-2">
                    <Star size={20} className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="currentColor" />
                 </div>
                 <span className="text-lg sm:text-xl font-black text-slate-900 leading-none">98%</span>
                 <span className="text-[7px] sm:text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Visa Success</span>
              </div>

              {/* Next Intake Box (Smaller & Clean) */}
              <div className="absolute -bottom-6 sm:-bottom-8 -left-6 sm:-left-8 bg-slate-900 text-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl w-40 sm:w-48 z-[10]">
                <p className="text-[8px] sm:text-[9px] text-green-400 font-bold uppercase mb-2">Upcoming Intake</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-xs">Sept 2026</span>
                  <span className="bg-green-600 px-1.5 sm:px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] font-black uppercase">Active</span>
                </div>
              </div>

              {/* Grid Background behind image */}
              <div className="absolute -inset-10 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-70 -z-10 translate-x-4 translate-y-4" />
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;