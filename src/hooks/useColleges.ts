import { useQuery, useInfiniteQuery } from '@tanstack/react-query'

interface College {
  _id: string
  name: string
  slug: string
  country_ref: any
  exams: string[]
  fees?: number
  duration?: string
  establishment_year?: string
  ranking?: string | {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  banner_url?: string
  about_content?: string
  is_active: boolean
  createdAt: string
  updatedAt: string

  // Comprehensive structure fields
  overview?: {
    title: string
    description: string
  }
  key_highlights?: {
    title: string
    description: string
    features: string[]
  }
  why_choose_us?: {
    title: string
    description: string
    features: { title: string; description: string }[]
  }
  admission_process?: {
    title: string
    description: string
    steps: string[]
  }
  documents_required?: {
    title: string
    description: string
    documents: string[]
  }
  fees_structure?: {
    title: string
    description: string
    courses: { course_name: string; duration: string; annual_tuition_fee: string }[]
  }
  campus_highlights?: {
    title: string
    description: string
    highlights: string[]
  }
}

interface CollegesResponse {
  colleges: College[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}

// Fetch colleges with pagination and filters
const fetchColleges = async ({ 
  pageParam = 1, 
  search = '', 
  country = '', 
  exam = '' 
}): Promise<CollegesResponse> => {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: '12',
    ...(search && { search }),
    ...(country && country !== 'all' && { country }),
    ...(exam && exam !== 'all' && { exam })
  })

  const response = await fetch(`/api/colleges?${params}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch colleges')
  }
  
  return {
    colleges: result.data.colleges || [],
    total: result.data.total || 0,
    page: pageParam,
    totalPages: Math.ceil((result.data.total || 0) / 12),
    hasMore: (result.data.colleges || []).length === 12
  }
}

// Fetch single college by slug
const fetchCollegeBySlug = async (slug: string): Promise<College> => {
  const response = await fetch(`/api/colleges/${slug}`)
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('College not found')
    }
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch college')
  }
  
  return result.data
}

// Hook for infinite scroll colleges list
export function useInfiniteColleges(search: string, country: string, exam: string) {
  return useInfiniteQuery({
    queryKey: ['colleges', 'infinite', search, country, exam],
    queryFn: ({ pageParam = 1 }) => fetchColleges({ 
      pageParam, 
      search, 
      country, 
      exam 
    }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

// Hook for single college details
export function useCollege(slug: string) {
  return useQuery({
    queryKey: ['college', slug],
    queryFn: () => fetchCollegeBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

// Hook for colleges filter options (countries and exams)
export function useCollegeFilters() {
  return useQuery({
    queryKey: ['college-filters'],
    queryFn: async () => {
      const response = await fetch('/api/colleges/filters')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch filters')
      }
      
      return result.data
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 45 * 60 * 1000, // 45 minutes
    retry: 2,
  })
}
