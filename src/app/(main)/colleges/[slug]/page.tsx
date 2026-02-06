import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CollegeDetailPage from './CollegeDetailPage'

interface CollegePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollegePageProps): Promise<Metadata> {
  const { slug } = await params
  
  return {
    title: `${slug} - AlphaWorld Education`,
    description: 'Learn more about this college',
  }
}

export default async function CollegePage({ params }: CollegePageProps) {
  const { slug } = await params
  
  return <CollegeDetailPage slug={slug} />
}
