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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'colleges'] })
    },
    onError: (error) => {
      console.error('Error saving college:', error)
      throw error
    }
  })
}

export function useDeleteCollege() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteCollege,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'colleges'] })
    },
    onError: (error) => {
      console.error('Error deleting college:', error)
      throw error
    }
  })
}
