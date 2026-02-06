"use client"
import React from 'react';
import { MapPin, Clock, DollarSign, Users, Star, CheckCircle, ArrowRight } from 'lucide-react';

export default function DestinationHighlights() {
  const destinations = [
    {
      country: "United States",
      flag: "🇺🇸",
      highlights: ["Ivy League Universities", "STEM Opportunities", "Research Facilities", "Cultural Diversity"],
      stats: { students: "1M+", universities: "5,000+", avgCost: "$25K-$60K", duration: "4 years" },
      color: "blue"
    },
    {
      country: "United Kingdom", 
      flag: "🇬🇧",
      highlights: ["3-Year Degrees", "Post-Study Work Visa", "World-Class Research", "Historic Institutions"],
      stats: { students: "500K+", universities: "160+", avgCost: "£15K-£38K", duration: "3 years" },
      color: "red"
    },
    {
      country: "Canada",
      flag: "🇨🇦", 
      highlights: ["Affordable Education", "Immigration Friendly", "Quality of Life", "Work Opportunities"],
      stats: { students: "650K+", universities: "100+", avgCost: "CAD$20K-40K", duration: "4 years" },
      color: "green"
    },
    {
      country: "Australia",
      flag: "🇦🇺",
      highlights: ["Top-Ranked Universities", "Research Focus", "Lifestyle", "Work Rights"],
      stats: { students: "750K+", universities: "43+", avgCost: "AUD$20K-45K", duration: "3-4 years" },
      color: "yellow"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        iconBg: "bg-blue-500",
        text: "text-blue-600",
        border: "border-blue-200",
        lightBg: "bg-blue-100"
      },
      red: {
        bg: "bg-red-50",
        iconBg: "bg-red-500", 
        text: "text-red-600",
        border: "border-red-200",
        lightBg: "bg-red-100"
      },
      green: {
        bg: "bg-green-50",
        iconBg: "bg-green-500",
        text: "text-green-600", 
        border: "border-green-200",
        lightBg: "bg-green-100"
      },
      yellow: {
        bg: "bg-yellow-50",
        iconBg: "bg-yellow-500",
        text: "text-yellow-600",
        border: "border-yellow-200", 
        lightBg: "bg-yellow-100"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.green;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span>🌍</span>
            Top Destinations
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-6">
            STUDY <span className="text-green-600">ABROAD</span>
          </h2>
          <p className="text-slate-500 font-semibold text-lg max-w-3xl mx-auto">
            Discover the most popular study destinations and what makes them special for international students.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {destinations.map((destination, index) => {
            const colors = getColorClasses(destination.color);
            return (
              <div key={index} className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Header */}
                <div className={`${colors.bg} p-6 border-b ${colors.border}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{destination.flag}</span>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900">{destination.country}</h3>
                        <div className={`inline-flex items-center gap-1 ${colors.text} text-sm font-bold`}>
                          <Star size={16} />
                          <span>Top Choice</span>
                        </div>
                      </div>
                    </div>
                    <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center text-white`}>
                      <MapPin size={24} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-3">Key Highlights</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {destination.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center gap-2">
                          <CheckCircle size={14} className={colors.text} />
                          <span className="text-xs font-medium text-slate-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`${colors.lightBg} rounded-xl p-3`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Users size={14} className={colors.text} />
                        <span className="text-xs font-black text-slate-600 uppercase">Students</span>
                      </div>
                      <div className="text-lg font-black text-slate-900">{destination.stats.students}</div>
                    </div>
                    <div className={`${colors.lightBg} rounded-xl p-3`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Star size={14} className={colors.text} />
                        <span className="text-xs font-black text-slate-600 uppercase">Universities</span>
                      </div>
                      <div className="text-lg font-black text-slate-900">{destination.stats.universities}</div>
                    </div>
                    <div className={`${colors.lightBg} rounded-xl p-3`}>
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign size={14} className={colors.text} />
                        <span className="text-xs font-black text-slate-600 uppercase">Avg Cost</span>
                      </div>
                      <div className="text-lg font-black text-slate-900">{destination.stats.avgCost}</div>
                    </div>
                    <div className={`${colors.lightBg} rounded-xl p-3`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock size={14} className={colors.text} />
                        <span className="text-xs font-black text-slate-600 uppercase">Duration</span>
                      </div>
                      <div className="text-lg font-black text-slate-900">{destination.stats.duration}</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className={`text-sm font-bold ${colors.text}`}>
                      Explore Programs
                    </div>
                    <div className={`w-10 h-10 ${colors.iconBg} rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-all transform hover:scale-105">
            <span>View All Destinations</span>
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </section>
  );
}
