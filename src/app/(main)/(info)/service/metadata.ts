import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'College Courses & Programs - Alpha World Education',
  description: 'Explore comprehensive college courses and study abroad programs at Alpha World Education. Find undergraduate, graduate, and professional programs across top universities worldwide with expert guidance.',
  keywords: 'college courses, study abroad programs, undergraduate programs, graduate programs, professional courses, university programs, international education, academic programs',
  alternates: {
    canonical: 'https://alphaworldeducation.com/service'
  },
  openGraph: {
    title: 'College Courses & Programs - Alpha World Education',
    description: 'Explore comprehensive college courses and study abroad programs at Alpha World Education. Find undergraduate, graduate, and professional programs across top universities worldwide.',
    type: 'website',
    url: 'https://alphaworldeducation.com/service',
    images: [
      {
        url: 'https://alphaworldeducation.com/images/courses-og.jpg',
        width: 1200,
        height: 630,
        alt: 'College Courses & Programs'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'College Courses & Programs - Alpha World Education',
    description: 'Explore comprehensive college courses and study abroad programs at Alpha World Education. Find undergraduate, graduate, and professional programs across top universities worldwide.',
    images: ['https://alphaworldeducation.com/images/courses-og.jpg']
  }
};
