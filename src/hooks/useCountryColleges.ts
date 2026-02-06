import { useQuery } from '@tanstack/react-query'

interface College {
  _id: string
  name: string
  slug: string
  category?: string
}

const fetchCollegesByCountry = async (countrySlug: string): Promise<College[]> => {
  const response = await fetch(`/api/colleges?country=${countrySlug}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch colleges')
  }
  return result.data.colleges || []
}

export function useCountryColleges(countrySlug: string | null) {
  return useQuery({
    queryKey: ['country-colleges', countrySlug],
    queryFn: () => countrySlug ? fetchCollegesByCountry(countrySlug) : [],
    enabled: !!countrySlug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  })
}
