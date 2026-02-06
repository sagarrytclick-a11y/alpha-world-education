'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface AdminBlog {
  _id: string
  title: string
  slug: string
  category: string
  tags: string[]
  content: string
  image: string
  related_exams: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

// Fetch all blogs for admin
const fetchAdminBlogs = async (): Promise<AdminBlog[]> => {
  const response = await fetch('/api/admin/blogs')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch blogs')
  }
  
  return result.data
}

// Create or update blog
const saveBlog = async (data: Partial<AdminBlog> & { _id?: string }): Promise<AdminBlog> => {
  const isEditing = !!data._id
  const url = isEditing ? `/api/admin/blogs/${data._id}` : '/api/admin/blogs'
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
    throw new Error(error.message || 'Failed to save blog')
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to save blog')
  }
  
  return result.data
}

// Delete blog
const deleteBlog = async (id: string): Promise<void> => {
  const response = await fetch(`/api/admin/blogs/${id}`, {
    method: 'DELETE'
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to delete blog')
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to delete blog')
  }
}

// Hooks
export function useAdminBlogs() {
  return useQuery({
    queryKey: ['admin', 'blogs'],
    queryFn: fetchAdminBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export function useSaveBlog() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: saveBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blogs'] })
    },
    onError: (error) => {
      console.error('Error saving blog:', error)
      throw error
    }
  })
}

export function useDeleteBlog() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blogs'] })
    },
    onError: (error) => {
      console.error('Error deleting blog:', error)
      throw error
    }
  })
}
