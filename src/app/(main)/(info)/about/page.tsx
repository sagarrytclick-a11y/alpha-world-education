"use client"
import React from 'react';
import Image from 'next/image';
import {
  PlayCircle, Star, Check, ShieldCheck,
  GraduationCap, TrendingUp, MoveRight,
  MapPin, Phone, Mail, ArrowUpRight,
  Calendar, Users, Award, Globe
} from 'lucide-react';
import { useFormModal } from '@/context/FormModalContext';

// --- Types ---
interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface Expert {
  name: string;
  role: string;
  image: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// --- Data ---
const timeline: TimelineItem[] = [
  { year: "2012", title: "Foundation in London", description: "Established to bridge the gap between talented students and top UK universities." },
  { year: "2016", title: "Global Expansion", description: "Expanded operations to Canada, Australia, and the US, partnering with 150+ institutions." },
  { year: "2022", title: "Digital Transformation", description: "Launched our AI-powered student portal to streamline applications." },
];

const experts: Expert[] = [
  { name: "James Carter", role: "Senior Counselor (UK)", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop" },
  { name: "Sarah Jenkins", role: "Visa Specialist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop" },
  { name: "Michael Chen", role: "University Relations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop" },
  { name: "Priya Patel", role: "Student Success Lead", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop" },
];

const values = [
  {
    title: "Integrity in Every Recommendation",
    description:
      "We believe education decisions shape lives. Our guidance is driven by honesty, transparency, and what is truly best for the student — not commissions or shortcuts.",
    subtext:
      "This principle has earned us trust across generations of students and parents."
  },
  {
    title: "Experience-Driven Expertise",
    description:
      "With 50+ years in international education counseling, our advice is grounded in real outcomes, evolving regulations, and deep institutional knowledge.",
    subtext:
      "Experience allows us to anticipate challenges before they arise."
  },
  {
    title: "Student-Centric Approach",
    description:
      "Every student’s journey is unique. We focus on individual goals, academic strengths, financial considerations, and long-term career outcomes.",
    subtext:
      "Personalized counseling has been central to our success for decades."
  },
  {
    title: "Long-Term Responsibility",
    description:
      "Our role does not end with admissions. We take responsibility for guiding students toward sustainable academic and professional futures.",
    subtext:
      "Our legacy is built on student success, not volume."
  }
];

const legacyTimeline = [
  {
    year: "1974",
    title: "Foundation Built on Academic Integrity",
    description:
      "Established with a singular mission — to provide honest, student-first guidance for overseas education when reliable information was limited."
  },
  {
    year: "1988",
    title: "National Expansion Across India",
    description:
      "Expanded counseling services nationwide, helping thousands of students make informed academic decisions with confidence."
  },
  {
    year: "2002",
    title: "Global University Partnerships",
    description:
      "Built strong partnerships with leading universities across the UK, USA, Canada, Australia, and Europe."
  },
  {
    year: "2012",
    title: "Trusted by Generations of Families",
    description:
      "Became a legacy brand, trusted by students, parents, and institutions across multiple generations."
  },
  {
    year: "Today",
    title: "50+ Years of Proven Student Success",
    description:
      "With five decades of experience, we continue to guide students globally with transparency, expertise, and measurable outcomes."
  }
];

export default function AboutPage() {
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
        src="/student-with-lightbulb-digital-art-style-education-day.jpg
"
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
          { label: "Visa Success Rate", value: "98%" },
          { label: "Students Placed", value: "10,000+" }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <h3 className="text-3xl font-bold text-green-600">{stat.value}</h3>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                From Vision to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">Reality</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                Founded in 2012, AlphaWorld Education began with a simple mission: to make quality international education accessible to every ambitious student, regardless of their background or location.
              </p>
              <p className="text-slate-500 text-lg leading-relaxed">
                Today, we are proud to have helped over 10,000 students from 50+ countries achieve their dreams of studying at world-class universities across the UK, Canada, Australia, and the United States.
              </p>
            </div>

            {/* Key Achievements */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-slate-700 font-medium">99% Visa Success Rate</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-slate-700 font-medium">$2.5M+ in Scholarships Secured</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-slate-700 font-medium">500+ University Partnerships</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 shadow-xl">
              <Image
                src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our Story"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
    <section className="max-w-7xl mx-auto px-6 py-28 bg-slate-50 rounded-3xl mx-6 mb-24 border border-slate-200">
      
      {/* Header */}
      <div className="max-w-3xl mb-20">
        <span className="text-sm font-semibold tracking-wider text-emerald-700 uppercase">
          Our Legacy
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6 leading-tight">
          50 Years of Guiding Students Toward Global Education
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          For over five decades, we have helped students navigate international
          education with integrity, expertise, and long-term success.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-300"></div>

        <div className="space-y-14">
          {legacyTimeline.map((item, index) => (
            <div key={index} className="relative pl-12">
              
              {/* Dot */}
              <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-white border-2 border-emerald-700 flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-700 rounded-full"></div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-semibold text-emerald-700">
                    {item.year}
                  </span>
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>



      {/* Our Values Section */}
    <section className="max-w-7xl mx-auto px-6 py-28 bg-white">
  {/* Header */}
<div className="max-w-3xl mx-auto mb-20 text-center">
  <span className="text-sm font-semibold tracking-wider text-emerald-700 uppercase">
    Our Values
  </span>

  <h2 className="text-4xl md:text-5xl font-bold text-emerald-700 mt-4 mb-6 leading-tight">
    Principles Shaped by 50 Years of Educational Guidance
  </h2>

  <p className="text-lg text-slate-600 leading-relaxed">
    Over five decades, our values have been refined through experience,
    responsibility, and a deep understanding of student aspirations.
    These principles guide every decision we make.
  </p>
</div>


  {/* Values Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    {values.map((value, index) => (
      <div
        key={index}
        className="border border-slate-200 rounded-2xl p-10 hover:border-slate-300 transition-colors duration-300"
      >
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-full border border-emerald-700 flex items-center justify-center text-emerald-700 font-semibold">
            {index + 1}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {value.title}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              {value.description}
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              {value.subtext}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Meet Our Experts */}
      {/* <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900">Meet Our Experts</h2>
            <p className="text-slate-500 mt-2">The dedicated minds guiding your journey.</p>
          </div>
          <button className="group flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all">
            View All Members <MoveRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map((expert, i) => (
            <div key={i} className="group relative rounded-[2rem] overflow-hidden aspect-[3/4] bg-slate-200 shadow-sm">
              <Image
                src={expert.image}
                alt={expert.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h4 className="text-xl font-bold">{expert.name}</h4>
                <p className="text-sm text-slate-300">{expert.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Contact CTA */}
    

    </main>
  );
}
