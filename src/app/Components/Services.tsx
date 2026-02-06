import Image from "next/image";
import {
  Settings,
  Download,
  Wallet,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { IconLink } from "@tabler/icons-react";
import Link from "next/link";

export default function ComprehensiveServices() {
  return (
    <section id="services" className="bg-gradient-to-br from-slate-50 via-green-50/30 to-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-48 h-48 sm:w-80 sm:h-80 bg-green-100 rounded-full blur-[80px] sm:blur-[120px] opacity-30" />
        <div className="absolute bottom-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-green-200 rounded-full blur-[80px] sm:blur-[100px] opacity-25" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8">
            <span>🎯</span>
            Complete Solution
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Comprehensive</span> Services
          </h2>

          <p className="mt-4 sm:mt-6 max-w-3xl text-lg sm:text-xl text-slate-600 mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
            From application to arrival, we handle <strong className="text-green-600">every aspect</strong> of your international education journey.
            Our end-to-end services ensure nothing falls through the cracks.
          </p>

          {/* Service highlights */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-green-500">✓</span>
              <span className="font-semibold text-sm sm:text-base">University Selection</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-green-500">✓</span>
              <span className="font-semibold text-sm sm:text-base">Application Support</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-green-500">✓</span>
              <span className="font-semibold text-sm sm:text-base">Visa Assistance</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-green-500">✓</span>
              <span className="font-semibold text-sm sm:text-base">Pre-Departure Support</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <Link
              href="/service"
              className="inline-flex items-center gap-2 sm:gap-3 bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
            >
              View All Services
              <ArrowUpRight size={18} className="sm:w-[20px] sm:h-[20px]" />
            </Link>
            {/* <a
              href="#"
              className="inline-flex items-center gap-2 font-semibold text-green-600 hover:text-green-700 transition-colors text-sm sm:text-base"
            >
              <span>📋</span> Download Service Brochure
            </a> */}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Left Large Card - Full width on mobile/tablet, spans 2 rows on desktop */}
          <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm">
            <div className="mb-4 sm:mb-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow">
              <Settings size={20} className="sm:w-[22px] sm:h-[22px]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
              AI-Powered Counseling
            </h3>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-500 leading-relaxed">
              Our proprietary algorithm matches your profile with 10,000+
              courses to find your perfect fit, verified by human experts.
            </p>

            {/* Image */}
            <div className="relative mt-6 sm:mt-10 h-32 sm:h-40 lg:h-48 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-100 to-green-50">
              <Image
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="AI technology and artificial intelligence concept"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Visa Assistance */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-sm">
            <div className="mb-4 sm:mb-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-slate-800">
              <Download size={20} className="sm:w-[22px] sm:h-[22px] text-green-400" />
            </div>

            <h3 className="text-lg sm:text-xl font-semibold">Visa Assistance</h3>
            <p className="mt-2 text-sm sm:text-base text-slate-400">99% success rate</p>

            <ArrowUpRight className="absolute right-4 top-4 sm:right-6 sm:top-6 text-slate-600" />
          </div>

          {/* Community */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm h-48 sm:h-64 lg:h-auto">
            <Image
              src="https://images.pexels.com/photos/5673501/pexels-photo-5673501.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Diverse group of students collaborating and networking"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 p-4 sm:p-6">
              <h3 className="mt-auto text-lg sm:text-xl font-semibold text-white">
                Community
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-200">
                Join alumni network
              </p>
            </div>
          </div>

          {/* Scholarships */}
          <div className="relative rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm">
            <div className="mb-4 sm:mb-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-green-100 text-green-500">
              <Wallet size={20} className="sm:w-[22px] sm:h-[22px]" />
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
              Scholarships
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-500">Financial aid support</p>

            <ArrowUpRight className="absolute right-4 top-4 sm:right-6 sm:top-6 text-slate-300" />
          </div>

          {/* Test Prep */}
          <div className="relative rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm">
            <div className="mb-4 sm:mb-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-green-100 text-green-500">
              <Globe size={20} className="sm:w-[22px] sm:h-[22px]" />
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
              Test Prep
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-500">IELTS, TOEFL, GRE</p>

            <ArrowUpRight className="absolute right-4 top-4 sm:right-6 sm:top-6 text-slate-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
