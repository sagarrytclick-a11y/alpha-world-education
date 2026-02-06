import { useQuery } from '@tanstack/react-query'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
  description?: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch('/api/countries', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch countries')
  }
  
  return result.data
}

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 45 * 60 * 1000, // 45 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export function useCountryBySlug(slug: string) {
  return useQuery({
    queryKey: ['country', slug],
    queryFn: async () => {
      const response = await fetch(`/api/countries/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Country not found')
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch country')
      }
      
      return result.data
    },
    enabled: !!slug,
    staleTime: 20 * 60 * 1000, // 20 minutes
    gcTime: 60 * 60 * 1000, // 60 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
