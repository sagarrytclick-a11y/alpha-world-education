"use client";

import React from 'react';
import { ArrowRight, Play, Star, ShieldCheck, GraduationCap, Sparkles, CheckCircle2, Globe2 } from 'lucide-react';
import Link from 'next/link';
import { useFormModal } from '@/context/FormModalContext';

const Hero: React.FC = () => {
  const { openModal } = useFormModal();

  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen flex items-center bg-[#FDFDFD] pt-28 pb-20 overflow-hidden">
      
      {/* --- ELITE BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Animated Mesh Gradient */}
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-gradient-to-tr from-blue-50 to-indigo-50/30 rounded-full blur-[100px]" />
        
        {/* Sophisticated Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN: Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Ultra-Modern Trust Badge */}
            <div className="group inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 mb-8 transition-transform hover:scale-105">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-${i+1}00 shadow-sm overflow-hidden`}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="student" />
                  </div>
                ))}
              </div>
              <p className="text-[13px] font-bold text-slate-700 ml-2">
                <span className="text-green-600">1,200+</span> students joined already
              </p>
              <div className="ml-2 w-2 h-2 rounded-full bg-green-500 animate-ping" />
            </div>

            {/* Cinematic Heading */}
            <h1 className="text-5xl sm:text-6xl xl:text-[70px] font-black text-slate-900 leading-[0.9] tracking-tight mb-8">
  Study Abroad. <br />
  <span className="relative">
    No Compromise.
    <span className="absolute -bottom-2 left-0 w-full h-3 bg-green-400/20 -z-10 rounded-full" />
  </span>
</h1>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 max-w-2xl">
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                We don’t just process applications; we architect <span className="text-slate-900 font-bold">global careers</span> through personalized university placement and end-to-end visa strategy.
              </p>
            </div>

            {/* High-Conversion CTA Group */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 mb-14">
              <Link href="/countries" className="relative group px-10 py-5 bg-green-600 text-white font-bold rounded-2xl overflow-hidden transition-all hover:shadow-[0_20px_40px_-15px_rgba(22,163,74,0.4)] hover:-translate-y-1">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Find Your University <ArrowRight size={20} />
                </span>
              </Link>

              <button onClick={openModal} className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all hover:shadow-xl">
                 <Play size={18} fill="currentColor" className="text-green-400" />
                 Get Free Roadmap
              </button>
            </div>

            {/* Premium Stat Cards */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-10">
              {[
                { label: "Success Rate", val: "99.2%", icon: CheckCircle2 },
                { label: "Partner Institutions", val: "850+", icon: GraduationCap },
                { label: "Countries", val: "40+", icon: Globe2 }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <stat.icon size={20} className="text-slate-400" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900">{stat.val}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: The Visual Composition */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="relative w-full max-w-[500px] mx-auto">
              
              {/* The "Main Stage" - Large Image with Organic Shape */}
              <div className="relative z-10 group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-green-200 to-blue-200 rounded-[4rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                
                <div className="relative rounded-[3.5rem] border-[12px] border-white shadow-2xl overflow-hidden aspect-[1/1.2]">
                  <img
                    src="/Hero/herosection.png"
                    alt="International Student"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Glass Card Over Image */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 text-white">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Upcoming Deadline</p>
                        <h4 className="text-xl font-black">Sept 2026 Intake</h4>
                      </div>
                      <div className="px-3 py-1 bg-green-500 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        Limited Slots
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floaties: Designed to look like UI elements */}
              <div className="absolute -top-10 -right-10 z-20 animate-float">
                <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                    <Star size={24} className="text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900 leading-none">4.9/5</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Student Rating</div>
                  </div>
                </div>
              </div>

              {/* Decorative Geometric Elements */}
              <div className="absolute -bottom-6 -left-10 z-20 bg-slate-900 text-white p-5 rounded-3xl shadow-2xl rotate-[-4deg] animate-float-delayed">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-green-500 rounded-lg">
                    <ShieldCheck size={18} />
                   </div>
                   <span className="text-sm font-bold tracking-tight">ISO Certified Consultancy</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          50% { transform: translateY(15px) rotate(-2deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;