'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface AdminExam {
  _id?: string
  name: string
  slug: string
  short_name: string
  image_url: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  is_active: boolean
  display_order: number
  hero_section: {
    title: string
    subtitle: string
    image: string
  }
  overview: {
    title: string
    content: string
    key_highlights: string[]
  }
  registration: {
    title: string
    description: string
    bullet_points: string[]
  }
  exam_pattern: {
    title: string
    description: string
    total_duration_mins: number
    score_range: string
    table_data: {
      section: string
      questions: number
      duration_mins: number
    }[]
  }
  exam_dates: {
    title: string
    important_dates: {
      event: string
      date: Date
    }[]
  }
  result_statistics: {
    title: string
    description: string
    passing_criteria: string
    total_marks: number
    passing_marks: number
  }
}

// Fetch all exams for admin
const fetchAdminExams = async (): Promise<AdminExam[]> => {
  const response = await fetch('/api/admin/exams')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch exams')
  }
  
  return result.data
}

// Fetch paginated exams for admin
const fetchAdminExamsPaginated = async ({ 
  page = 1, 
  limit = 10 
}): Promise<{
  exams: AdminExam[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  })

  console.log('🔍 DEBUG: Fetching exams with params:', params.toString())

  const response = await fetch(`/api/admin/exams?${params}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  console.log('🔍 DEBUG: Exams API response:', result)
  
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch exams')
  }
  
  const exams = result.data || []
  const total = result.total || exams.length
  
  return {
    exams,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    hasMore: exams.length === limit
  }
}

// Create or update exam
const saveExam = async (data: Partial<AdminExam> & { _id?: string }): Promise<AdminExam> => {
  const isEditing = !!data._id
  const url = isEditing ? `/api/admin/exams/${data._id}` : '/api/admin/exams'
  const method = isEditing ? 'PUT' : 'POST'
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to save exam')
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to save exam')
  }
  
  return result.data
}

// Delete exam
const deleteExam = async (id: string): Promise<void> => {
  const response = await fetch(`/api/admin/exams/${id}`, {
    method: 'DELETE'
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to delete exam')
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to delete exam')
  }
}

// Hooks
export function useAdminExams() {
  return useQuery({
    queryKey: ['admin', 'exams'],
    queryFn: fetchAdminExams,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export function useAdminExamsPaginated(page: number, limit: number = 10) {
  return useQuery({
    queryKey: ['admin', 'exams', 'paginated', page, limit],
    queryFn: () => fetchAdminExamsPaginated({ page, limit }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export function useSaveExam() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: saveExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'exams'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'exams', 'paginated'] })
    },
    onError: (error) => {
      console.error('Error saving exam:', error)
      throw error
    }
  })
}

export function useDeleteExam() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'exams'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'exams', 'paginated'] })
    },
    onError: (error) => {
      console.error('Error deleting exam:', error)
      throw error
    }
  })
}
