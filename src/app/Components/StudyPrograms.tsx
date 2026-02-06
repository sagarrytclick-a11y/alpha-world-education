"use client"
import React from 'react';
import { BookOpen, Target, BrainCircuit, Lightbulb, Award, Globe, ArrowRight } from 'lucide-react';

export default function StudyPrograms() {
  const programs = [
    {
      icon: Globe,
      title: "Foundation Programs",
      description: "Preparatory courses for international students to meet university requirements",
      features: ["Pathway Programs", "University Prep", "English Foundation", "Academic Skills"],
      color: "blue"
    },
    {
      icon: Target,
      title: "Degree Programs Abroad", 
      description: "Complete bachelor's and master's degrees in foreign universities",
      features: ["Full Degrees", "Transfer Programs", "Joint Degrees", "Exchange Programs"],
      color: "green"
    },
    {
      icon: BrainCircuit,
      title: "Professional Certifications",
      description: "International certifications and professional courses abroad",
      features: ["Professional Diplomas", "Industry Certifications", "Technical Training", "Executive Programs"],
      color: "purple"
    },
    {
      icon: BookOpen,
      title: "Research Programs",
      description: "Research opportunities and PhD programs at international institutions",
      features: ["PhD Programs", "Research Assistantships", "Post-Doc Research", "Academic Research"],
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        iconBg: "bg-blue-500",
        text: "text-blue-600",
        border: "border-blue-200"
      },
      green: {
        bg: "bg-green-50", 
        iconBg: "bg-green-500",
        text: "text-green-600",
        border: "border-green-200"
      },
      purple: {
        bg: "bg-purple-50",
        iconBg: "bg-purple-500", 
        text: "text-purple-600",
        border: "border-purple-200"
      },
      orange: {
        bg: "bg-orange-50",
        iconBg: "bg-orange-500",
        text: "text-orange-600", 
        border: "border-orange-200"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.green;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            <span>�</span>
            Study Abroad Programs
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-4 sm:mb-6">
            STUDY <span className="text-green-600">ABROAD</span>
          </h2>
          <p className="text-slate-500 font-semibold text-base sm:text-lg max-w-3xl mx-auto px-4">
            Comprehensive study abroad programs designed for international students seeking global education opportunities.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {programs.map((program, index) => {
            const colors = getColorClasses(program.color);
            return (
              <div key={index} className={`group relative ${colors.bg} rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 ${colors.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-2`}>
                {/* Decorative Pattern */}
                <div className={`absolute top-0 right-0 w-20 h-20 ${colors.iconBg} opacity-10 rounded-bl-full -mr-10 -mt-10`} />
                
                <div className={`w-10 h-10 sm:w-14 sm:h-14 ${colors.iconBg} rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  <program.icon size={28} className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                
                <h3 className={`text-lg sm:text-xl font-black text-slate-900 mb-2 sm:mb-3 group-hover:${colors.text} transition-colors`}>
                  {program.title}
                </h3>
                
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  {program.description}
                </p>
                
                <div className="space-y-2">
                  {program.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className={`w-2 h-2 ${colors.iconBg} rounded-full`} />
                      <span className="text-xs font-medium text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:shadow-lg transition-all transform hover:scale-105">
            <span className="text-sm sm:text-base">Explore Study Abroad Programs</span>
            <ArrowRight size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
