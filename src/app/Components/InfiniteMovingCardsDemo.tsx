"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { GraduationCap, BookOpen, Award, Star, Crown, Shield, MapPin, Target } from "lucide-react";


const companies = [
  {
    name: "Harvard",
    icon: Crown,
  },
  {
    name: "Oxford",
    icon: Shield,
  },
  {
    name: "Cambridge",
    icon: BookOpen,
  },
  {
    name: "Stanford",
    icon: Star,
  },
  {
    name: "MIT",
    icon: Target,
  },
  {
    name: "Yale",
    icon: Award,
  },
  {
    name: "Princeton",
    icon: MapPin,
  },
  {
    name: "Columbia",
    icon: GraduationCap,
  },
];

export function InfiniteMovingCardsDemo() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-green-50/20 to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-32 left-20 w-48 h-48 sm:w-80 sm:h-80 bg-green-100 rounded-full blur-[80px] sm:blur-[120px] opacity-30" />
        <div className="absolute bottom-32 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-green-200 rounded-full blur-[80px] sm:blur-[100px] opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            <span>🏛️</span>
            Global Partners
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tight">
            World's Leading <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Universities</span>
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg px-4">
            Our students gain admission to prestigious institutions worldwide through our exclusive partnerships and proven methodologies.
          </p>
        </div>

        {/* Moving Cards */}
        <div className="h-[16rem] flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={companies}
            direction="right"
            speed="fast"
          />
        </div>

        {/* Bottom stats */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center gap-6 sm:gap-8 bg-white border border-slate-100 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-3 sm:py-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">500+</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">Partner Universities</div>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">Acceptance Rate</div>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">50+</div>
              <div className="text-sm text-slate-500 uppercase tracking-wide">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
