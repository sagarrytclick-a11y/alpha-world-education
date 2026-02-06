"use client"
import React from 'react';
import { FileText, Award, Users, Calendar, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';

export default function SuccessStories() {
  const stories = [
    {
      name: "Priya Sharma",
      country: "🇺🇸 USA",
      university: "MIT",
      program: "Computer Science",
      image: "/api/placeholder/80/80",
      story: "From a small town in India to MIT - Alpha World made my dream come true with personalized guidance and scholarship support.",
      achievement: "Full Scholarship $80K",
      year: "2024"
    },
    {
      name: "Rahul Patel",
      country: "🇬🇧 UK", 
      university: "Oxford",
      program: "MBA",
      image: "/api/placeholder/80/80",
      story: "Professional guidance helped me crack Oxford MBA interview. The visa process was seamless with their support.",
      achievement: "Dean's Excellence Award",
      year: "2023"
    },
    {
      name: "Ananya Reddy",
      country: "🇨🇦 Canada",
      university: "University of Toronto",
      program: "Data Science",
      image: "/api/placeholder/80/80", 
      story: "Alpha World helped me choose the right program and secured a 75% scholarship. Now working at top tech company.",
      achievement: "75% Scholarship",
      year: "2024"
    }
  ];

  const achievements = [
    {
      icon: Award,
      value: "500+",
      label: "Success Stories",
      description: "Students placed in top universities"
    },
    {
      icon: TrendingUp,
      value: "$10M+",
      label: "Scholarships",
      description: "Secured for our students"
    },
    {
      icon: Users,
      value: "98%",
      label: "Visa Success",
      description: "Rate across all countries"
    },
    {
      icon: FileText,
      value: "1000+",
      label: "Admissions",
      description: "This year alone"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span>🌟</span>
            Success Stories
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-6">
            STUDENT <span className="text-green-600">ACHIEVEMENTS</span>
          </h2>
          <p className="text-slate-500 font-semibold text-lg max-w-3xl mx-auto">
            Real stories from real students who transformed their dreams into reality with Alpha World.
          </p>
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stories.map((story, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              {/* Student Header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-black">
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-black text-slate-900">{story.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>{story.country}</span>
                      <span>•</span>
                      <span>{story.year}</span>
                    </div>
                  </div>
                  <div className="text-2xl">
                    {story.country.split(' ')[0]}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award size={16} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-green-600">{story.achievement}</div>
                    <div className="text-xs text-slate-500">{story.university}</div>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold mb-3">
                    <FileText size={12} />
                    {story.program}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {story.story}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                    <CheckCircle size={14} />
                    <span>Success Story</span>
                  </div>
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white group-hover:bg-green-600 transition-colors">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              Our Track Record
            </h3>
            <p className="text-slate-500">Numbers that showcase our commitment to excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto">
                  <achievement.icon size={32} />
                </div>
                <div className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                  {achievement.value}
                </div>
                <div className="text-lg font-bold text-green-600 mb-1">
                  {achievement.label}
                </div>
                <div className="text-sm text-slate-500">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all transform hover:scale-105">
            <span>Read More Success Stories</span>
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </section>
  );
}
