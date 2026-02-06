export function getCountryName(country: any): string {
  if (!country) return "Unknown"
  if (typeof country === "string") return country
  if (typeof country === "object") return country.name ?? "Unknown"
  return "Unknown"
}
export function getCountrySlug(country: any): string | null {
  if (!country) return null
  if (typeof country === "string") return country
  if (typeof country === "object") return country.slug ?? null
  return null
}

