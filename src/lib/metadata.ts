import type { Metadata } from 'next'

// Base metadata configuration
const BASE_URL = 'https://alphaworldeducation.com'
const SITE_NAME = 'Alpha World Education'

// Common metadata properties
const commonMetadata = {
  keywords: [
    'study abroad',
    'international education',
    'college admissions',
    'university applications',
    'visa assistance',
    'scholarships',
    'education consultants',
    'overseas education',
    'student counseling',
    'academic guidance'
  ].join(', '),
  authors: [{ name: 'Alpha World Education' }],
  creator: 'Alpha World Education',
  publisher: 'Alpha World Education',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    images: [
      {
        url: `${BASE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AlphaWorldEdu',
    creator: '@AlphaWorldEdu',
  },
}

// Dynamic metadata generation function for content pages
export function generatePageMetadata({
  title,
  description,
  slug,
  keywords,
  imageUrl,
  type = 'website'
}: {
  title: string
  description: string
  slug: string
  keywords?: string[]
  imageUrl?: string
  type?: 'website' | 'article'
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${BASE_URL}/${slug}`
  const metaKeywords = keywords ? keywords.join(', ') : commonMetadata.keywords

  return {
    ...commonMetadata,
    metadataBase: new URL(BASE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`
    },
    description,
    keywords: metaKeywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      ...commonMetadata.openGraph,
      title,
      description,
      type,
      url,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : commonMetadata.openGraph.images
    },
    twitter: {
      ...commonMetadata.twitter,
      title,
      description,
      images: imageUrl ? [imageUrl] : [`${BASE_URL}/images/og-default.jpg`]
    }
  }
}

// Specific metadata generators for different content types

export function generateExamMetadata(exam: {
  name: string
  short_name: string
  description: string
  slug: string
}) {
  return generatePageMetadata({
    title: `${exam.name} (${exam.short_name})`,
    description: exam.description,
    slug: `exams/${exam.slug}`,
    keywords: [
      exam.name,
      exam.short_name,
      'exam preparation',
      'study abroad exam',
      'international entrance exam',
      'college admission test'
    ],
    imageUrl: `${BASE_URL}/images/exams/${exam.slug}.jpg`,
    type: 'article'
  })
}

export function generateBlogMetadata(blog: {
  title: string
  excerpt: string
  slug: string
  tags?: string[]
}) {
  return generatePageMetadata({
    title: blog.title,
    description: blog.excerpt,
    slug: `blogs/${blog.slug}`,
    keywords: [
      ...(blog.tags || []),
      'education blog',
      'study abroad tips',
      'college advice',
      'international education'
    ],
    imageUrl: `${BASE_URL}/images/blogs/${blog.slug}.jpg`,
    type: 'article'
  })
}

export function generateCountryMetadata(country: {
  name: string
  description: string
  slug: string
}) {
  return generatePageMetadata({
    title: `Study in ${country.name}`,
    description: country.description,
    slug: `countries/${country.slug}`,
    keywords: [
      `study in ${country.name}`,
      `${country.name} universities`,
      `${country.name} education`,
      `${country.name} student visa`,
      `${country.name} colleges`
    ],
    imageUrl: `${BASE_URL}/images/countries/${country.slug}.jpg`,
    type: 'article'
  })
}

export function generateCollegeMetadata(college: {
  name: string
  description: string
  location: string
  slug: string
}) {
  return generatePageMetadata({
    title: college.name,
    description: college.description,
    slug: `colleges/${college.slug}`,
    keywords: [
      college.name,
      college.location,
      'university admission',
      'college application',
      'study abroad university',
      'international college'
    ],
    imageUrl: `${BASE_URL}/images/colleges/${college.slug}.jpg`,
    type: 'article'
  })
}

// Static metadata for main pages
export const staticPageMetadata = {
  home: generatePageMetadata({
    title: 'Study Abroad & International Education',
    description: 'Alpha World Education is your trusted partner for international college admissions and study abroad programs. Get expert guidance for studying abroad in top universities worldwide with personalized counseling and comprehensive support services.',
    slug: '',
    keywords: [
      'study abroad',
      'international education',
      'college admissions',
      'university applications',
      'alpha world education'
    ],
    imageUrl: `${BASE_URL}/images/home-og.jpg`
  }),
  
  about: generatePageMetadata({
    title: 'About Alpha World Education',
    description: 'Learn about Alpha World Education, your trusted partner for international college admissions. With 25+ years of experience, we\'ve helped 100,000+ students achieve their dreams.',
    slug: 'about',
    keywords: [
      'about alpha world education',
      'international education consultants',
      'study abroad consultants',
      'college admission guidance',
      'education consultancy'
    ],
    imageUrl: `${BASE_URL}/images/about-og.jpg`
  }),
  
  contact: generatePageMetadata({
    title: 'Contact Alpha World Education',
    description: 'Contact Alpha World Education for expert guidance on international college admissions. Call us, email, or visit our office for personalized study abroad counseling.',
    slug: 'contact',
    keywords: [
      'contact alpha world education',
      'study abroad contact',
      'college admission help',
      'education consultants contact',
      'student support'
    ],
    imageUrl: `${BASE_URL}/images/contact-og.jpg`
  }),
  
  courses: generatePageMetadata({
    title: 'College Courses & Programs',
    description: 'Explore comprehensive college courses and study abroad programs at Alpha World Education. Find undergraduate, graduate, and professional programs across top universities worldwide.',
    slug: 'service',
    keywords: [
      'college courses',
      'study abroad programs',
      'undergraduate programs',
      'graduate programs',
      'university programs',
      'academic programs'
    ],
    imageUrl: `${BASE_URL}/images/courses-og.jpg`
  })
}

// Viewport configuration for Next.js 16
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#12141D',
}

// Re-export viewport for easy importing in other pages
export { viewport as defaultViewport };
