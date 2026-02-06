'use client'

import { useQuery } from '@tanstack/react-query'

export interface DashboardStats {
  countries: number
  colleges: number
  blogs: number
  exams: number
}

// Fetch dashboard statistics
const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch('/api/admin/stats')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch dashboard stats')
  }
  
  return result.data
}

// Hook for dashboard statistics
export function useAdminDashboardStats() {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn: fetchDashboardStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
