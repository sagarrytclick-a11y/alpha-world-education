import { useQuery } from '@tanstack/react-query'

interface Exam {
  _id: string
  name: string
  slug: string
  short_name: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  hero_section?: {
    title: string
    subtitle?: string
    image?: string
  }
  is_active: boolean
  display_order: number
}

const fetchExams = async (): Promise<Exam[]> => {
  const response = await fetch('/api/exams', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch exams')
  }
  
  return result.data
}

export function useExams() {
  return useQuery({
    queryKey: ['exams'],
    queryFn: fetchExams,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
