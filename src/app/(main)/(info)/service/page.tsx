"use client";
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

const ServicesPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans">

      <div className="relative z-10">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm"
            >
              <motion.div
                animate={{
                  rotate: [0, 14, -8, 14, -4, 10, 0, 0],
                  scale: [1, 1.1, 0.9, 1.1, 0.95, 1.05, 1, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
                className="text-lg"
              >
                🎯
              </motion.div>
              <span className="tracking-wide">COMPREHENSIVE GUIDANCE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight"
            >
              Your Complete Study
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600"
              >
                Abroad Solution
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed mb-12"
            >
              From university selection to visa approval, accommodation to career guidance -
              we handle every aspect of your international education journey with expertise and care.
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-slate-500"
            >
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                99% Success Rate
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                500+ Universities
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                25+ Countries
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                10k+ Students
              </span>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                Our Comprehensive Services
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Every service is designed to address specific challenges in your study abroad journey,
                ensuring you have expert support at every step.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* University Admissions */}
          <AnimatedCard delay={0.1}>
            <motion.div
              className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-green-300 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              whileHover={{ y: -8 }}
            >
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <GraduationCap size={28} className="text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">
                  University Admissions
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                  Strategic guidance for top universities worldwide. We match your profile with perfect institutions.
                </p>

                <motion.div
                  className="flex items-center text-green-600 font-semibold group-hover:text-green-700"
                  whileHover={{ x: 4 }}
                >
                  <span>Learn More</span>
                  <ArrowUpRight size={18} className="ml-2" />
                </motion.div>
              </div>

              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-transparent rounded-full -translate-y-8 translate-x-8 opacity-50 group-hover:opacity-70 transition-opacity" />
            </motion.div>
          </AnimatedCard>

          {/* Visa Assistance */}
          <AnimatedCard delay={0.2}>
            <motion.div
              className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              whileHover={{ y: -8 }}
            >
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <FileText size={28} className="text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Visa Assistance
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                  Expert visa application support with 99% success rate across all major destinations.
                </p>

                <motion.div
                  className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700"
                  whileHover={{ x: 4 }}
                >
                  <span>Get Started</span>
                  <ArrowUpRight size={18} className="ml-2" />
                </motion.div>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-8 translate-x-8 opacity-50 group-hover:opacity-70 transition-opacity" />
            </motion.div>
          </AnimatedCard>

          {/* Accommodation */}
          <AnimatedCard delay={0.3}>
            <motion.div
              className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              whileHover={{ y: -8 }}
            >
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Home size={28} className="text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">
                  Accommodation
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                  Pre-arranged housing solutions in verified locations near your university campus.
                </p>

                <motion.div
                  className="flex items-center text-green-600 font-semibold group-hover:text-green-700"
                  whileHover={{ x: 4 }}
                >
                  <span>Find Housing</span>
                  <ArrowUpRight size={18} className="ml-2" />
                </motion.div>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-transparent rounded-full -translate-y-8 translate-x-8 opacity-50 group-hover:opacity-70 transition-opacity" />
            </motion.div>
          </AnimatedCard>

          {/* Scholarships */}
          <AnimatedCard delay={0.4}>
            <motion.div
              className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              whileHover={{ y: -8 }}
            >
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl mb-6 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <DollarSign size={28} className="text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Scholarships
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                  Access to exclusive scholarships and financial aid opportunities worth millions.
                </p>

                <motion.div
                  className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700"
                  whileHover={{ x: 4 }}
                >
                  <span>Explore Funds</span>
                  <ArrowUpRight size={18} className="ml-2" />
                </motion.div>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-full -translate-y-8 translate-x-8 opacity-50 group-hover:opacity-70 transition-opacity" />
            </motion.div>
          </AnimatedCard>

          {/* Test Prep */}
          <AnimatedCard delay={0.5}>
            <motion.div
              className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-green-300 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              whileHover={{ y: -8 }}
            >
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-6 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <BookOpen size={28} className="text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-pink-600 transition-colors">
                  Test Prep
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                  Comprehensive preparation for IELTS, TOEFL, GRE, and other entrance exams.
                </p>

                <motion.div
                  className="flex items-center text-pink-600 font-semibold group-hover:text-pink-700"
                  whileHover={{ x: 4 }}
                >
                  <span>Start Learning</span>
                  <ArrowUpRight size={18} className="ml-2" />
                </motion.div>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-50 to-transparent rounded-full -translate-y-8 translate-x-8 opacity-50 group-hover:opacity-70 transition-opacity" />
            </motion.div>
          </AnimatedCard>

          {/* Career Counseling */}
          <AnimatedCard delay={0.6}>
            <motion.div
              className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-green-300 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              whileHover={{ y: -8 }}
            >
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl mb-6 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <TrendingUp size={28} className="text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">
                  Career Counseling
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                  Personalized career guidance and roadmap creation for your future success.
                </p>

                <motion.div
                  className="flex items-center text-cyan-600 font-semibold group-hover:text-cyan-700"
                  whileHover={{ x: 4 }}
                >
                  <span>Get Advice</span>
                  <ArrowUpRight size={18} className="ml-2" />
                </motion.div>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-50 to-transparent rounded-full -translate-y-8 translate-x-8 opacity-50 group-hover:opacity-70 transition-opacity" />
            </motion.div>
          </AnimatedCard>
          </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-slate-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">
                Proven Results That Speak
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Our track record speaks for itself. Join thousands of successful students who have transformed their futures.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
              <AnimatedCounter end="10000" suffix="Students Placed" />
              <AnimatedCounter end="500" suffix="University Partners" />
              <AnimatedCounter end="25" suffix="Countries Served" />
              <AnimatedCounter prefix="$" end="50000" suffix="Scholarships Secured" />
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors">
                Begin Your Journey
                <ArrowRight className="inline-block ml-3 w-5 h-5" />
              </Link>
              <p className="text-slate-500 text-sm mt-4">Free consultation • No commitment required</p>
            </motion.div>
          </div>
        </section>
      </div>
      <FAQ />
    </div>
  );
};

export default ServicesPage;