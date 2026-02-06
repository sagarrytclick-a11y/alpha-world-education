import { useQuery } from '@tanstack/react-query'

interface Blog {
  _id: string
  title: string
  slug: string
  category: string
  tags: string[]
  content: string
  image?: string
  author?: string
  published_at?: string
  read_time?: number
  views?: number
  comments?: number
  related_exams: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

// Fetch all blogs
const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch('/api/blogs', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch blogs')
  }
  
  return result.data
}

// Fetch single blog by slug
const fetchBlogBySlug = async (slug: string): Promise<Blog> => {
  const response = await fetch(`/api/blogs/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Blog not found')
    }
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch blog')
  }
  
  return result.data
}

// Hook for all blogs
export function useBlogs() {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
 
// Hook for single blog details
export function useBlog(slug: string) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => fetchBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

// Hook for blog categories (derived from blogs)
export function useBlogCategories(blogs: Blog[] = []) {
  const categories = [...new Set(blogs.map(blog => blog.category))]
  return categories
}
