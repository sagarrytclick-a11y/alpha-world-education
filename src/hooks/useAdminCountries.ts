'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface AdminCountry {
  _id: string
  name: string
  slug: string
  flag: string
  description: string
  meta_title: string
  meta_description: string
  is_active: boolean
  createdAt: string
  updatedAt: string
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

// Create or update country
const saveCountry = async (data: Partial<AdminCountry> & { _id?: string }): Promise<AdminCountry> => {
  const isEditing = !!data._id
  const url = isEditing ? `/api/admin/countries/${data._id}` : '/api/admin/countries'
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
    throw new Error(error.message || 'Failed to save country')
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to save country')
  }
  
  return result.data
}

// Delete country
const deleteCountry = async (id: string): Promise<void> => {
  const response = await fetch(`/api/admin/countries/${id}`, {
    method: 'DELETE'
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to delete country')
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to delete country')
  }
}

// Hooks
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

export function useSaveCountry() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: saveCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'countries'] })
    },
    onError: (error) => {
      console.error('Error saving country:', error)
      throw error
    }
  })
}

export function useDeleteCountry() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'countries'] })
    },
    onError: (error) => {
      console.error('Error deleting country:', error)
      throw error
    }
  })
}
