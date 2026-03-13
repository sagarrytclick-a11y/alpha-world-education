'use client'

import React from 'react';
import { useFormModal } from '@/context/FormModalContext';
import FAQ from "@/app/Components/FAQ";

function AboutPageContent() {
  const { openModal } = useFormModal();
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* Hero Section */}
<section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center bg-white">
  
  {/* LEFT CONTENT */}
  <div>
    <span className="text-sm font-semibold tracking-widest text-emerald-700 uppercase">
      About Us
    </span>

    <h1 className="mt-6 text-xl sm:text-5xl lg:text-4xl font-bold text-slate-900 leading-tight">
      25 Years of Guiding Students<br />
      Toward Global Education Excellence
    </h1>

    <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
      For over five decades, we have helped students and families navigate
      international education with clarity, integrity, and confidence.
      Our guidance is built on experience — not trends.
    </p>

    {/* STATS */}
    <div className="mt-10 grid grid-cols-3 gap-8 max-w-xl">
      <div>
        <p className="text-3xl font-bold text-slate-900">25+</p>
        <p className="text-sm text-slate-500 mt-1">Years of Experience</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-900">100,000+</p>
        <p className="text-sm text-slate-500 mt-1">Students Guided</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-900">20+</p>
        <p className="text-sm text-slate-500 mt-1">Study Destinations</p>
      </div>
    </div>

    {/* CTA */}
    <div className="mt-12">
      <button
        className="px-8 py-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors"
      >
        Learn About Our Legacy
      </button>
    </div>
  </div>

  {/* RIGHT IMAGE */}
  <div className="relative">
    <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-50">
      <img
        src="/student-with-lightbulb-digital-art-style-education-day.jpg"
        alt="Students guided toward global education"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Rating Badge */}
    <div className="absolute -bottom-6 left-6 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
      <p className="text-lg font-bold text-slate-900 leading-none">4.9 / 5</p>
      <p className="text-xs text-slate-500 mt-1">
        Rated by global students & families
      </p>
    </div>
  </div>
</section>



      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-y border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Years Experience", value: "25+" },
          { label: "Partner Universities", value: "500+" },
          { label: "Visa Success Rate", value: "97%" },
          { label: "Students Placed", value: "10,000+" }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <h3 className="text-3xl font-bold text-green-600">{stat.value}</h3>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <FAQ />
    </main>
  );
}

export default AboutPageContent;
