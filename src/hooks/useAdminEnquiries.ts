import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// Types for our data
export interface Enquiry {
  _id: string
  name: string
  email: string
  phone: string
  city: string
  subject: string
  message: string
  status: 'pending' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  source: 'contact-form' | 'website' | 'email' | 'phone' | 'other'
  assignedTo?: string | null
  createdAt: string
  updatedAt: string
}

// Hook for fetching all enquiries
export function useAdminEnquiries() {
  return useQuery({
    queryKey: ['admin-enquiries'],
    queryFn: async (): Promise<Enquiry[]> => {
      const response = await fetch('/api/admin/enquiries')
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch enquiries')
      }
      
      const result = await response.json()
      return result.data || []
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

// Hook for fetching paginated enquiries
export function useAdminEnquiriesPaginated(page: number, limit: number = 10, search: string = '', status: string = 'all', priority: string = 'all') {
  return useQuery({
    queryKey: ['admin-enquiries', 'paginated', page, limit, search, status, priority],
    queryFn: async (): Promise<{
      enquiries: Enquiry[]
      total: number
      page: number
      totalPages: number
      hasMore: boolean
    }> => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(status && status !== 'all' && { status }),
        ...(priority && priority !== 'all' && { priority })
      })

      console.log('🔍 DEBUG: Fetching enquiries with params:', params.toString())

      const response = await fetch(`/api/admin/enquiries?${params}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch enquiries')
      }
      
      const result = await response.json()
      console.log('🔍 DEBUG: Enquiries API response:', result)
      
      const enquiries = result.data || []
      const total = result.total || enquiries.length
      
      return {
        enquiries,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: enquiries.length === limit
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: true, // Ensure the query is always enabled
  })
}

// Hook for updating enquiry status
export function useUpdateEnquiryStatus() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }): Promise<void> => {
      console.log(`🔄 [HOOK] Updating enquiry status: ${id} -> ${status}`);
      
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })
      
      console.log(`📡 [HOOK] Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error(`❌ [HOOK] Error response:`, errorData);
        throw new Error(errorData.error || 'Failed to update enquiry status')
      }
      
      const result = await response.json();
      console.log(`✅ [HOOK] Success response:`, result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] })
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries', 'paginated'] })
      toast.success('Enquiry status updated successfully!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update enquiry status')
      console.error('Update enquiry status error:', error)
    },
  })
}
export function useDeleteEnquiry() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete enquiry')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] })
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries', 'paginated'] })
      toast.success('Enquiry deleted successfully!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete enquiry')
      console.error('Delete enquiry error:', error)
    },
  })
}
