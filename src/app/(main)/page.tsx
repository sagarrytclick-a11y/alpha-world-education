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
import type { Metadata } from 'next';
import { staticPageMetadata, defaultViewport } from '@/lib/metadata';
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = staticPageMetadata.home;

export { defaultViewport as viewport };

// Structured Data Component for Home Page
const HomeStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Alpha World Education",
    "alternateName": "Alpha World Education - Study Abroad Consultants",
    "url": "https://alphaworldeducation.com",
    "description": "Alpha World Education is your trusted partner for international college admissions and study abroad programs. Get expert guidance for studying abroad in top universities worldwide with personalized counseling and comprehensive support services.",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "isFamilyFriendly": true,
    "publisher": {
      "@type": "Organization",
      "name": "Alpha World Education",
      "url": "https://alphaworldeducation.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://alphaworldeducation.com/images/logo.png",
        "width": 512,
        "height": 512
      },
      "sameAs": [
        "https://www.facebook.com/AlphaWorldEducation",
        "https://www.twitter.com/AlphaWorldEdu",
        "https://www.linkedin.com/company/alpha-world-education"
      ]
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": "https://alphaworldeducation.com/blogs?q={search_term}",
        "query-input": "required name=search_term"
      },
      {
        "@type": "ReadAction",
        "target": "https://alphaworldeducation.com/blogs"
      },
      {
        "@type": "CommunicateAction",
        "target": "https://alphaworldeducation.com/contact"
      }
    ],
    "mainEntity": {
      "@type": "Organization",
      "name": "Alpha World Education",
      "description": "Leading international education consultancy providing study abroad programs, university admissions, and visa guidance services",
      "url": "https://alphaworldeducation.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "India"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.facebook.com/AlphaWorldEducation",
        "https://www.twitter.com/AlphaWorldEdu",
        "https://www.linkedin.com/company/alpha-world-education"
      ]
    },
    "about": {
      "@type": "Thing",
      "name": "International Education Services",
      "description": "Study abroad consultancy, university admissions, visa assistance, and educational guidance for international students"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

// Client component wrapper
function HomePageContent() {
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
}

export default function HomePage() {
  return (
    <>
      <SchemaMarkup pageType="home" />
      <HomeStructuredData />
      <HomePageContent />
    </>
  );
}