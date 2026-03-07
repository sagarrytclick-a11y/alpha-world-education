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

// Fetch paginated blogs for admin
const fetchAdminBlogsPaginated = async ({ 
  page = 1, 
  limit = 10,
  search = '',
  category = '',
  status = ''
}): Promise<{
  blogs: AdminBlog[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(category && category !== 'all' && { category }),
    ...(status && status !== 'all' && { status })
  })

  console.log('🔍 DEBUG: Fetching blogs with params:', params.toString())

  const response = await fetch(`/api/admin/blogs?${params}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  console.log('🔍 DEBUG: Blogs API response:', result)
  
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch blogs')
  }
  
  const blogs = result.data || []
  const total = result.total || blogs.length
  
  return {
    blogs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    hasMore: blogs.length === limit
  }
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

export function useAdminBlogsPaginated(page: number, limit: number = 10, search: string = '', category: string = '', status: string = '') {
  return useQuery({
    queryKey: ['admin', 'blogs', 'paginated', page, limit, search, category, status],
    queryFn: () => fetchAdminBlogsPaginated({ page, limit, search, category, status }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: true, // Ensure the query is always enabled
  })
}

export function useSaveBlog() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: saveBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blogs'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'blogs', 'paginated'] })
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
      queryClient.invalidateQueries({ queryKey: ['admin', 'blogs', 'paginated'] })
    },
    onError: (error) => {
      console.error('Error deleting blog:', error)
      throw error
    }
  })
}
