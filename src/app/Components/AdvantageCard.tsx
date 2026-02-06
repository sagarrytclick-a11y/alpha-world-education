"use client"
import React from 'react';
import { GraduationCap, ShieldCheck, Landmark, ArrowRight } from 'lucide-react';

interface AdvantageCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  circleColor: string;
}

const AdvantageCard = ({ icon, title, description, iconBgColor, circleColor }: AdvantageCardProps) => (
  <div className="relative overflow-hidden bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md flex flex-col gap-3 sm:gap-4">
    {/* Decorative Background Circle */}
    <div className={`absolute -right-6 sm:-right-8 -top-6 sm:-top-8 h-24 w-24 sm:h-32 sm:w-32 rounded-full ${circleColor} opacity-40`} />

    <div className={`relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl ${iconBgColor}`}>
      {icon}
    </div>

    <div className="relative z-10 mt-1 sm:mt-2">
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  </div>
);

export default function AlphaWorldAdvantage() {
  const advantages = [
    {
      title: "Expert Counselors",
      description: "Dedicated mentors with decades of experience in international education. We pair you with specialists in your desired field.",
      icon: <GraduationCap className="w-6 h-6 text-green-600" />,
      iconBgColor: "bg-green-50",
      circleColor: "bg-green-50"
    },
    {
      title: "99% Visa Success",
      description: "Proven track record of navigating complex visa procedures seamlessly. Our team stays updated on the latest immigration policies.",
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
      iconBgColor: "bg-green-50",
      circleColor: "bg-green-50"
    },
    {
      title: "Top 100 Uni Partners",
      description: "Direct partnerships with the most prestigious institutions globally. Get access to exclusive scholarships and waivers.",
      icon: <Landmark className="w-6 h-6 text-green-600" />,
      iconBgColor: "bg-green-50",
      circleColor: "bg-green-50"
    }
  ];

  return (
    <section id="about" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-green-50/20 to-slate-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-green-400 rounded-full blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-green-300 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>

      <div className="relative text-center mb-8 sm:mb-12 lg:mb-16">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8">
          <span>🎯</span>
          Why Choose Us
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">AlphaWorld Advantage</span>
        </h2>

        <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto mb-4 sm:mb-6 px-4">
          Join over <strong className="text-green-600">15,000+ ambitious students</strong> who've transformed their futures with our proven methodology.
          We don't just guide—we guarantee your success with data-driven strategies and personalized mentorship.
        </p>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">15,000+</div>
            <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wide">Students Guided</div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">98.5%</div>
            <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wide">Success Rate</div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">500+</div>
            <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wide">University Partners</div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">24/7</div>
            <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wide">Support Available</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a
          href="#"
          className="group flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Learn more about us
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="#"
          className="group flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
        >
          <span>📊</span> View Success Metrics
        </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {advantages.map((adv, index) => (
          <AdvantageCard key={index} {...adv} />
        ))}
      </div>
    </section>
  );
}