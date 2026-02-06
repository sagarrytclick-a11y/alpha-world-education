"use client"
import React, { useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Testimonial = {
  name: string;
  course: string;
  quote: string;
  image: string;
  location: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Aravind Iyer",
    course: "MS IN COMPUTER SCIENCE, STANFORD",
    quote: "AlphaWorld Education turned my Ivy League dream into reality. From shortlisting universities to my SOP review, their attention to detail was incredible. I even secured a $20k scholarship!",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Mumbai, India"
  },
  {
    name: "Sneha Kapoor",
    course: "MBA, INSEAD FRANCE",
    quote: "The visa process for Europe seemed daunting, but the team handled everything. Their mock interviews gave me the confidence I needed. Best decision for my international career.",
    image: "https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Delhi, India"
  },
  {
    name: "Rohan Deshmukh",
    course: "MENG, UNIVERSITY OF TORONTO",
    quote: "I was worried about my education loan and financial docs. AlphaWorld's tie-ups with banks made the process seamless. I'm now studying in Canada without any financial stress.",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Pune, India"
  },
  {
    name: "Ananya Reddy",
    course: "MASTERS IN DATA ANALYTICS, NUS",
    quote: "The personalized guidance is what sets them apart. They didn't just give me a list; they helped me choose the right fit for my career goals in Singapore.",
    image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Hyderabad, India"
  }
];

export default function StudentTestimonials() {
  // Initialize Carousel with Autoplay (4 seconds delay)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="testimonials" className="bg-gradient-to-br from-slate-50 via-green-50/20 to-white py-16 sm:py-24 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-green-100 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-200 rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span className="animate-pulse">🇮🇳</span>
            India's Most Trusted Consultants
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Success Stories from <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Our Global Indians</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-6 text-slate-600 font-medium italic">
            <span>"99% Visa Success Rate"</span>
            <span className="hidden sm:block">•</span>
            <span>"₹2Cr+ Scholarships Secured"</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((item, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3 sm:px-4">
                  <div className="h-full rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
                    <div>
                      <Quote className="text-green-200 mb-4" size={40} fill="currentColor" />
                      <div className="flex gap-1 text-amber-400 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className="text-lg text-slate-700 leading-relaxed mb-8 font-medium">
                        "{item.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-green-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-base">{item.name}</p>
                        <p className="text-xs font-bold uppercase text-green-600 tracking-wider mb-0.5">{item.course}</p>
                        <p className="text-xs text-slate-400">{item.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Navigation - Positioned for better UX */}
          <div className="flex justify-center mt-12 gap-4">
            <button 
              onClick={scrollPrev}
              className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-600 transition-all hover:border-green-500 hover:text-green-600 shadow-md active:scale-95"
            >
              <ArrowLeft size={24} className="transition-transform group-hover:-translate-x-1" />
            </button>
            <button 
              onClick={scrollNext}
              className="group flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white transition-all hover:bg-green-700 shadow-lg hover:shadow-green-200 active:scale-95"
            >
              <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}