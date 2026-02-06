// Types for the AlphaWorld Education App

export interface College {
  id: number;
  slug: string;
  name: string;
  location: string;
  rank: string;
  ranking?: string;
  establishment_year?: string;
  tuition: string;
  acceptance: string;
  employability?: string;
  rating?: string;
  students?: string;
  image: string;
  tags: string[];
  founded?: string;
  type?: string;
  website?: string;
}

export interface BlogPost {
  _id: number;
  slug: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  created_by?: {
    name: string;
    avatar?: string;
  };
  created_at?: string;
  body?: string;
}

export type Course = {
  _id: string;
  slug: string; // ✅ REQUIRED
  title: string;
  description: string;
  category: string;
  duration: string;
  popularIn: string;
  avgTuition: string;
  prospects: string;
  overview: string;
  curriculum?: string[];
  requirements?: string[];
  careerPath?: string;
  college?: string;
  level?: string;
  fees?: string;
};


export interface CollegeFilters {
  location?: string;
  type?: string;
  tuitionRange?: [number, number];
  acceptanceRate?: number;
  rankingRange?: [number, number];
  tags?: string[];
}

export interface BlogFilters {
  category?: string;
  searchQuery?: string;
  dateRange?: [string, string];
}

export interface CourseFilters {
  category?: string;
  searchQuery?: string;
  duration?: string;
  location?: string;
}

export type SortOption = 'ranking-high' | 'ranking-low' | 'tuition-low' | 'tuition-high' | 'name-asc' | 'name-desc';

export type BlogSortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc' | 'read-time-asc' | 'read-time-desc';

export type CourseSortOption = 'title-asc' | 'title-desc' | 'duration-asc' | 'duration-desc' | 'category-asc' | 'category-desc';

export interface Country {
  name: string;
  flag: string;
}

export interface University {
  id: number;
  name: string;
  location: string;
  logo: string;
  image: string;
  description: string;
  isFeatured: boolean;
}
