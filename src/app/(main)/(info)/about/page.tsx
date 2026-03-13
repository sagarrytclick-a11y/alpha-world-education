import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { defaultViewport } from '@/lib/metadata';
import {
  PlayCircle, Star, Check, ShieldCheck,
  GraduationCap, TrendingUp, MoveRight,
  MapPin, Phone, Mail, ArrowUpRight,
  Calendar, Users, Award, Globe
} from 'lucide-react';
import SchemaMarkup from "@/components/SchemaMarkup";
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About Alpha World Education - Leading College Education Platform',
  description: 'Learn about Alpha World Education, your trusted partner for international college admissions. With 25+ years of experience, we\'ve helped 100,000+ students achieve their dreams of studying abroad in top universities across UK, USA, Canada, and Australia.',
  keywords: 'about alpha world education, international education consultants, study abroad consultants, college admission guidance, overseas education, student counseling, university admissions, education consultancy',
  alternates: {
    canonical: 'https://alphaworldeducation.com/about'
  },
  openGraph: {
    title: 'About Alpha World Education - Leading College Education Platform',
    description: 'Learn about Alpha World Education, your trusted partner for international college admissions. With 25+ years of experience, we\'ve helped 100,000+ students achieve their dreams.',
    type: 'website',
    url: 'https://alphaworldeducation.com/about',
    images: [
      {
        url: 'https://alphaworldeducation.com/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'About Alpha World Education'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Alpha World Education - Leading College Education Platform',
    description: 'Learn about Alpha World Education, your trusted partner for international college admissions. With 25+ years of experience, we\'ve helped 100,000+ students achieve their dreams.',
    images: ['https://alphaworldeducation.com/images/about-og.jpg']
  }
};

export { defaultViewport as viewport };

export default function AboutPage() {
  return (
    <>
      <SchemaMarkup pageType="about" />
      <AboutPageContent />
    </>
  );
}
