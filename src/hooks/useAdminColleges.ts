'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface AdminCollege {
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
  display_order: number
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
  ranking_section?: {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
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

export interface AdminCountry {
  _id: string
  name: string
  slug: string
  flag: string
}

// Fetch all colleges for admin
const fetchAdminColleges = async (): Promise<AdminCollege[]> => {
  const response = await fetch('/api/admin/colleges')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch colleges')
  }
  
  return result.data
}

// Fetch all countries for admin
const fetchAdminCountries = async (): Promise<AdminCountry[]> => {
  const response = await fetch('/api/admin/countries')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch countries')
  }
  
  return result.data
}

// Create or update college
const saveCollege = async (data: Partial<AdminCollege> & { _id?: string }): Promise<AdminCollege> => {
  const isEditing = !!data._id
  const url = isEditing ? `/api/admin/colleges/${data._id}` : '/api/admin/colleges'
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
    throw new Error(error.message || 'Failed to save college')
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to save college')
  }
  
  return result.data
}

// Delete college
const deleteCollege = async (id: string): Promise<void> => {
  const response = await fetch(`/api/admin/colleges/${id}`, {
    method: 'DELETE'
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to delete college')
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to delete college')
  }
}

// Fetch paginated colleges for admin
const fetchAdminCollegesPaginated = async ({ 
  page = 1, 
  limit = 10 
}): Promise<{
  colleges: AdminCollege[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  })

  console.log('🔍 DEBUG: Fetching colleges with params:', params.toString())

  const response = await fetch(`/api/admin/colleges?${params}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  console.log('🔍 DEBUG: Colleges API response:', result)
  
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch colleges')
  }
  
  const colleges = result.data || []
  const total = result.total || colleges.length
  
  return {
    colleges,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    hasMore: colleges.length === limit
  }
}

// Hook for fetching paginated colleges
export function useAdminCollegesPaginated(page: number, limit: number = 10) {
  return useQuery({
    queryKey: ['admin', 'colleges', 'paginated', page, limit],
    queryFn: () => fetchAdminCollegesPaginated({ page, limit }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: true, // Ensure the query is always enabled
  })
}

// Hooks
export function useAdminColleges() {
  return useQuery({
    queryKey: ['admin', 'colleges'],
    queryFn: fetchAdminColleges,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export function useAdminCountries() {
  return useQuery({
    queryKey: ['admin', 'countries'],
    queryFn: fetchAdminCountries,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export function useSaveCollege() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: saveCollege,
    onMutate: async (newCollege) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['admin', 'colleges'] })
      await queryClient.cancelQueries({ queryKey: ['admin', 'colleges', 'paginated'] })
      
      // Snapshot previous values
      const previousColleges = queryClient.getQueryData(['admin', 'colleges'])
      const previousPaginatedColleges = queryClient.getQueryData(['admin', 'colleges', 'paginated'])
      
      // Optimistically update the cache for new college
      if (!newCollege._id) {
        const optimisticCollege: AdminCollege = {
          ...newCollege,
          _id: `temp-${Date.now()}`,
          is_active: true,
          display_order: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as AdminCollege
        
        queryClient.setQueryData(['admin', 'colleges'], (old: any) => {
          if (!old) return [optimisticCollege]
          return [optimisticCollege, ...old]
        })
        
        // Update paginated queries
        queryClient.setQueriesData({ queryKey: ['admin', 'colleges', 'paginated'] }, (old: any) => {
          if (!old) return old
          return {
            ...old,
            colleges: [optimisticCollege, ...old.colleges],
            total: old.total + 1
          }
        })
      }
      
      return { previousColleges, previousPaginatedColleges }
    },
    onError: (error, variables, context) => {
      // Rollback optimistic updates on error
      if (context?.previousColleges) {
        queryClient.setQueryData(['admin', 'colleges'], context.previousColleges)
      }
      if (context?.previousPaginatedColleges) {
        queryClient.setQueriesData({ queryKey: ['admin', 'colleges', 'paginated'] }, context.previousPaginatedColleges)
      }
      console.error('Error saving college:', error)
      throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'colleges'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'colleges', 'paginated'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard', 'stats'] })
    },
  })
}

export function useDeleteCollege() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteCollege,
    onMutate: async (deletedId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['admin', 'colleges'] })
      await queryClient.cancelQueries({ queryKey: ['admin', 'colleges', 'paginated'] })
      
      // Snapshot previous values
      const previousColleges = queryClient.getQueryData(['admin', 'colleges'])
      const previousPaginatedColleges = queryClient.getQueryData(['admin', 'colleges', 'paginated'])
      
      // Optimistically remove from cache
      queryClient.setQueryData(['admin', 'colleges'], (old: any) => {
        if (!old) return old
        return old.filter((college: AdminCollege) => college._id !== deletedId)
      })
      
      // Update paginated queries
      queryClient.setQueriesData({ queryKey: ['admin', 'colleges', 'paginated'] }, (old: any) => {
        if (!old) return old
        return {
          ...old,
          colleges: old.colleges.filter((college: AdminCollege) => college._id !== deletedId),
          total: Math.max(0, old.total - 1)
        }
      })
      
      return { previousColleges, previousPaginatedColleges }
    },
    onError: (error, variables, context) => {
      // Rollback optimistic updates on error
      if (context?.previousColleges) {
        queryClient.setQueryData(['admin', 'colleges'], context.previousColleges)
      }
      if (context?.previousPaginatedColleges) {
        queryClient.setQueriesData({ queryKey: ['admin', 'colleges', 'paginated'] }, context.previousPaginatedColleges)
      }
      console.error('Error deleting college:', error)
      throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'colleges'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'colleges', 'paginated'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard', 'stats'] })
    },
  })
}
