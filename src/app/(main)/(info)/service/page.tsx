'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  GraduationCap,
  FileText,
  DollarSign,
  BookOpen,
  TrendingUp,
  ArrowUpRight,
  Home,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import FAQ from "@/app/Components/FAQ";
import SchemaMarkup from "@/components/SchemaMarkup";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }: {
  end: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true });

  // Parse the end value to get the numeric part
  const getNumericValue = (value: string) => {
    const match = value.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const getSuffix = (value: string) => {
    return value.replace(/[\d.]/g, '');
  };

  const numericEnd = getNumericValue(end);
  const displaySuffix = getSuffix(end);

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
      controls.start("visible");

      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * numericEnd));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, isVisible, numericEnd, duration, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6 }}
      className="text-center group"
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600 mb-2 transition-all duration-300 group-hover:scale-110">
        {prefix}{count.toLocaleString()}{displaySuffix}
      </div>
      <div className="text-xs tracking-widest text-slate-500 font-bold uppercase">
        {suffix}
      </div>
    </motion.div>
  );
};

// Animated Card Component
const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      {children}
    </motion.div>
  );
};

// Client component wrapper
function ServicesPageContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white py-20 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center text-sm text-slate-500 mb-8">
              <Link href="/" className="hover:text-slate-700 transition-colors flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <ArrowRight className="w-4 h-4 mx-2" />
              <span className="text-slate-900 font-medium">Services</span>
            </nav>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-tight">
              Comprehensive
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                {" "}Services
              </span>
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
              From test preparation to visa assistance, we provide end-to-end support for your international education journey. Our expert team ensures you make informed decisions every step of the way.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "10,000+", label: "Students Helped" },
                { number: "500+", label: "University Partners" },
                { number: "25+", label: "Countries" },
                { number: "98%", label: "Success Rate" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">
              Our Core
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                {" "}Services
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive support services designed to make your international education journey smooth and successful.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Simple service cards */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-green-300 hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 flex items-center justify-center">
                <GraduationCap size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">University Admissions</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Strategic guidance for top universities worldwide. We match your profile with perfect institutions.
              </p>
              <div className="flex items-center text-green-600 font-semibold">
                <span>Learn More</span>
                <ArrowUpRight size={18} className="ml-2" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center">
                <FileText size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Visa Assistance</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Expert visa application support with 99% success rate across all major destinations.
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <span>Get Started</span>
                <ArrowUpRight size={18} className="ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <FAQ />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <SchemaMarkup pageType="service" />
      <ServicesPageContent />
    </>
  );
}