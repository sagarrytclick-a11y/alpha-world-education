import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CollegeDetailPage from './CollegeDetailPage'
import { generateCollegeMetadata, defaultViewport } from '@/lib/metadata'

interface CollegePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollegePageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    // Fetch college data for metadata
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/colleges/${slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return {
        title: 'College Not Found | Alpha World Education',
        description: 'The college you are looking for could not be found.',
        alternates: {
          canonical: `https://alphaworldeducation.com/colleges/${slug}`
        }
      }
    }

    const result = await response.json()
    
    if (!result.success || !result.data) {
      return {
        title: 'Colleges | Alpha World Education',
        description: 'Explore top colleges and universities for international education.',
        alternates: {
          canonical: `https://alphaworldeducation.com/colleges/${slug}`
        }
      }
    }

    const college = result.data
    
    return generateCollegeMetadata({
      name: college.name,
      description: college.description,
      location: college.location || 'International',
      slug: college.slug
    })
  } catch (error) {
    return {
      title: 'Colleges | Alpha World Education',
      description: 'Explore top colleges and universities for international education.',
      alternates: {
        canonical: `https://alphaworldeducation.com/colleges/${slug}`
      }
    }
  }
}

export { defaultViewport as viewport };

export default async function CollegePage({ params }: CollegePageProps) {
  const { slug } = await params
  
  return <CollegeDetailPage slug={slug} />
}
