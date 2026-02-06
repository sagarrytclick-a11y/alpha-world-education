"use client";

import AlphaWorldAdvantage from "@/app/Components/AdvantageCard";
import CtaSection from "@/app/Components/CtaSection";
import DestinationHighlights from "@/app/Components/DestinationHighlights";
import EducationStats from "@/app/Components/EducationStats";
import FAQ from "@/app/Components/FAQ";
import FeaturedSection from "@/app/Components/FeaturedExams";
import Hero from "@/app/Components/Hero";
import { InfiniteMovingCardsDemo } from "@/app/Components/InfiniteMovingCardsDemo";
import LatestBlogs from "@/app/Components/LatestBlogs";
import PopularCountries from "@/app/Components/PopularCountries";
import ProcessJourney from "@/app/Components/ProcessJourney";
import Services from "@/app/Components/Services";
import StudentTestimonials from "@/app/Components/StudentTestimonials";
import StudyPrograms from "@/app/Components/StudyPrograms";
import SuccessStories from "@/app/Components/SuccessStories";

const page = () => {
  return (
    <div className="w-full bg-white text-black overflow-x-hidden">
      <Hero />
      <FeaturedSection />
      <StudyPrograms />
      <EducationStats />
      <PopularCountries />
      <LatestBlogs />
      <Services />
      <AlphaWorldAdvantage />
      <ProcessJourney />
      <StudentTestimonials />
      <FAQ />
      <InfiniteMovingCardsDemo />
      <CtaSection />
    </div>
  );
};

export default page;