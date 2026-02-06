import React from 'react';
import { MessageSquare, FileText, Briefcase, Plane, Home } from 'lucide-react';

const JourneyStep = ({ icon: Icon, title, description, isOrange = false }: {
  icon: any, title: string, description: string, isOrange?: boolean
}) => (
  <div className="flex flex-col items-center text-center flex-1 z-10">
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-md transition-transform hover:scale-110
      ${isOrange ? 'bg-green-500 text-white' : 'bg-white text-slate-800'}`}>
      <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
    </div>
    <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">{title}</h3>
    <p className="text-slate-400 text-xs sm:text-sm leading-snug max-w-[140px] sm:max-w-[160px]">{description}</p>
  </div>
);

export default function ProcessJourney() {
  const steps = [
    { icon: MessageSquare, title: "Counseling", description: "Profile analysis & guidance", isOrange: true },
    { icon: FileText, title: "Application", description: "University selection & filing" },
    { icon: Briefcase, title: "Visa", description: "Documentation & interview prep" },
    { icon: Plane, title: "Departure", description: "Pre-departure briefing" },
    { icon: Home, title: "Settling In", description: "Accommodation assistance" }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-green-50/20 to-slate-50 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-32 right-20 w-48 h-48 sm:w-64 sm:h-64 bg-green-100 rounded-full blur-[60px] sm:blur-[80px] opacity-40" />
        <div className="absolute bottom-32 left-20 w-56 h-56 sm:w-80 sm:h-80 bg-green-200 rounded-full blur-[80px] sm:blur-[100px] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
          <span>🗺️</span>
          Your Success Roadmap
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tight">
          From <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Dream to Departure</span>
        </h2>

        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
          Our <strong className="text-green-600">proven 5-step methodology</strong> has guided thousands of students to their dream universities.
          Every step is meticulously designed for maximum success and minimum stress.
        </p>

        {/* Progress Timeline Header */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-600">98.5%</div>
            <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wide">Completion Rate</div>
          </div>
          <div className="w-8 sm:w-12 lg:w-16 h-px bg-green-300"></div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-600">3-6 Months</div>
            <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wide">Average Timeline</div>
          </div>
          <div className="w-8 sm:w-12 lg:w-16 h-px bg-green-300"></div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-600">$2.5M+</div>
            <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wide">Scholarships Won</div>
          </div>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-[2px] bg-slate-100 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 lg:gap-4">
            {steps.map((step, idx) => (
              <JourneyStep key={idx} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}