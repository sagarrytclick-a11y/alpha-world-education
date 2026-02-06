"use client"
import React from 'react';
import { GraduationCap, TrendingUp, Users, Award, BookOpen, Target, Globe, BrainCircuit } from 'lucide-react';

export default function EducationStats() {
  const stats = [
    {
      icon: GraduationCap,
      value: "10,000+",
      label: "Students Placed",
      description: "Successfully enrolled in top universities"
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Success Rate", 
      description: "Visa and admission success rate"
    },
    {
      icon: Users,
      value: "50+",
      label: "Partner Universities",
      description: "Across multiple countries"
    },
    {
      icon: Award,
      value: "$5M+",
      label: "Scholarships",
      description: "Secured for our students"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span>📊</span>
            Our Impact
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-6">
            NUMBERS THAT <span className="text-green-600">SPEAK</span>
          </h2>
          <p className="text-slate-500 font-semibold text-lg max-w-3xl mx-auto">
            Our track record shows our commitment to student success and global education excellence.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white mb-6">
                <stat.icon size={32} />
              </div>
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-bold text-green-600 mb-2">
                {stat.label}
              </div>
              <div className="text-slate-500 text-sm leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
