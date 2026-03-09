'use client'

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

interface ComprehensiveCollegeFormData {
  // Basic Info
  name: string
  slug: string
  country_ref: string
  exams: string[]
  banner_url?: string
  is_active: boolean
  establishment_year?: string

  // Overview
  overview_title: string
  overview_description: string

  // Key Highlights
  key_highlights_title: string
  key_highlights_description: string
  key_highlights_features: string[]

  // Why Choose Us
  why_choose_us_title: string
  why_choose_us_description: string
  why_choose_us_features: { title: string; description: string }[]

  // Ranking & Recognition
  ranking_title: string
  ranking_description: string
  country_ranking: string
  world_ranking: string
  accreditation: string[]

  // Admission Process
  admission_process_title: string
  admission_process_description: string
  admission_process_steps: string[]

  // Documents Required
  documents_required_title: string
  documents_required_description: string
  documents_required_documents: string[]

  // Fees Structure
  fees_structure_title: string
  fees_structure_description: string
  fees_structure_courses: { course_name: string; duration: string; annual_tuition_fee: string }[]

  // Campus Highlights
  campus_highlights_title: string
  campus_highlights_description: string
  campus_highlights_highlights: string[]
}

interface College {
  _id: string
  name: string
  slug: string
  country_ref: AdminCountry | string
  exams: string[]
  fees?: number
  duration?: string
  establishment_year?: string
  ranking?: string | {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  banner_url?: string
  about_content?: string
  is_active: boolean
  display_order: number
  createdAt: string
  updatedAt: string

  // Comprehensive structure fields
  overview?: {
    title: string
    description: string
  }
  key_highlights?: {
    title: string
    description: string
    features: string[]
  }
  why_choose_us?: {
    title: string
    description: string
    features: { title: string; description: string }[]
  }
  ranking_section?: {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  admission_process?: {
    title: string
    description: string
    steps: string[]
  }
  documents_required?: {
    title: string
    description: string
    documents: string[]
  }
  fees_structure?: {
    title: string
    description: string
    courses: { course_name: string; duration: string; annual_tuition_fee: string }[]
  }
  campus_highlights?: {
    title: string
    description: string
    highlights: string[]
  }
}

interface AdminCountry {
  _id: string
  name: string
  slug: string
  flag: string
}

interface CollegeContextType {
  // Modal states
  isModalOpen: boolean
  editingCollege: College | null
  deleteModalOpen: boolean
  collegeToDelete: College | null

  // Filter and pagination states
  searchTerm: string
  selectedCountry: string
  currentPage: number
  itemsPerPage: number

  // Form data
  formData: ComprehensiveCollegeFormData

  // Modal actions
  openModal: () => void
  closeModal: () => void
  openEditModal: (college: College) => void
  openDeleteModal: (college: College) => void
  closeDeleteModal: () => void

  // Form actions
  updateFormData: (field: string, value: any) => void
  setFormData: React.Dispatch<React.SetStateAction<ComprehensiveCollegeFormData>>
  resetForm: () => void
  loadCollegeForEdit: (college: College) => void

  // Filter and pagination actions
  setSearchTerm: (term: string) => void
  setSelectedCountry: (country: string) => void
  setCurrentPage: Dispatch<SetStateAction<number>>
  setItemsPerPage: (items: number) => void

  // Reset actions
  resetModalStates: () => void
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined)

const initialFormData: ComprehensiveCollegeFormData = {
  // Basic Info
  name: '',
  slug: '',
  country_ref: '',
  exams: [] as string[],
  banner_url: '',
  is_active: true,
  establishment_year: '',

  // Overview
  overview_title: 'Overview',
  overview_description: '',

  // Key Highlights
  key_highlights_title: 'Key Highlights',
  key_highlights_description: '',
  key_highlights_features: [] as string[],

  // Why Choose Us
  why_choose_us_title: 'Why Choose Us',
  why_choose_us_description: '',
  why_choose_us_features: [] as { title: string; description: string }[],

  // Ranking & Recognition
  ranking_title: 'Ranking & Recognition',
  ranking_description: '',
  country_ranking: '',
  world_ranking: '',
  accreditation: [] as string[],

  // Admission Process
  admission_process_title: 'Admission Process',
  admission_process_description: '',
  admission_process_steps: [] as string[],

  // Documents Required
  documents_required_title: 'Documents Required',
  documents_required_description: '',
  documents_required_documents: [] as string[],

  // Fees Structure
  fees_structure_title: 'Fees Structure',
  fees_structure_description: '',
  fees_structure_courses: [] as { course_name: string; duration: string; annual_tuition_fee: string }[],

  // Campus Highlights
  campus_highlights_title: 'Campus Highlights',
  campus_highlights_description: '',
  campus_highlights_highlights: [] as string[],
}

export const CollegeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCollege, setEditingCollege] = useState<College | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [collegeToDelete, setCollegeToDelete] = useState<College | null>(null)

  // Filter and pagination states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Form data
  const [formData, setFormData] = useState<ComprehensiveCollegeFormData>(initialFormData)

  // Modal actions
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCollege(null)
  }

  const openEditModal = (college: College) => {
    setEditingCollege(college)
    loadCollegeForEdit(college)
    setIsModalOpen(true)
  }

  const openDeleteModal = (college: College) => {
    setCollegeToDelete(college)
    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setCollegeToDelete(null)
  }

  // Form actions
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Auto-generate slug when name changes and slug is empty or being edited for the first time
      ...(field === 'name' && (!prev.slug || prev.slug === generateSlug(prev.name)) ? {
        slug: generateSlug(value as string)
      } : {})
    }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const loadCollegeForEdit = (college: College) => {
    console.log('🔍 DEBUG: Loading college for edit:', college)
    console.log('🔍 DEBUG: college.ranking type:', typeof college.ranking)
    console.log('🔍 DEBUG: college.ranking value:', college.ranking)

    // Properly extract all existing data when editing
    const extractedRanking = typeof college.ranking === 'object' && college.ranking !== null
      ? college.ranking
      : {
          title: 'Ranking & Recognition',
          description: '',
          country_ranking: college.ranking || '',
          world_ranking: '',
          accreditation: []
        }

    const extractedFeesStructure = college.fees_structure || {
      title: "Fees Structure",
      description: "",
      courses: college.fees ? [{
        course_name: "Program",
        duration: college.duration || "N/A",
        annual_tuition_fee: `$${college.fees.toLocaleString()}`
      }] : []
    }

    // Initialize form with ALL existing college data
    setFormData({
      // Basic Info
      name: college.name || '',
      slug: college.slug || '',
      country_ref: (typeof college.country_ref === 'object' && college.country_ref?.slug) ? college.country_ref.slug : (typeof college.country_ref === 'string' ? college.country_ref : '') || '',
      exams: college.exams || [],
      banner_url: college.banner_url || '',
      is_active: college.is_active !== undefined ? college.is_active : true,
      establishment_year: college.establishment_year || '',

      // Overview - load existing data
      overview_title: college.overview?.title || 'Overview',
      overview_description: college.overview?.description || college.about_content || '',

      // Key Highlights - load existing data
      key_highlights_title: college.key_highlights?.title || 'Key Highlights',
      key_highlights_description: college.key_highlights?.description || '',
      key_highlights_features: college.key_highlights?.features || [],

      // Why Choose Us - load existing data
      why_choose_us_title: college.why_choose_us?.title || 'Why Choose Us',
      why_choose_us_description: college.why_choose_us?.description || '',
      why_choose_us_features: college.why_choose_us?.features || [],

      // Ranking & Recognition - load existing data
      ranking_title: extractedRanking.title || 'Ranking & Recognition',
      ranking_description: extractedRanking.description || '',
      country_ranking: extractedRanking.country_ranking || '',
      world_ranking: extractedRanking.world_ranking || '',
      accreditation: extractedRanking.accreditation || [],

      // Admission Process - load existing data
      admission_process_title: college.admission_process?.title || 'Admission Process',
      admission_process_description: college.admission_process?.description || '',
      admission_process_steps: college.admission_process?.steps || [],

      // Documents Required - load existing data
      documents_required_title: college.documents_required?.title || 'Documents Required',
      documents_required_description: college.documents_required?.description || '',
      documents_required_documents: college.documents_required?.documents || [],

      // Fees Structure - load existing data
      fees_structure_title: extractedFeesStructure.title || 'Fees Structure',
      fees_structure_description: extractedFeesStructure.description || '',
      fees_structure_courses: extractedFeesStructure.courses || [],

      // Campus Highlights - load existing data
      campus_highlights_title: college.campus_highlights?.title || 'Campus Highlights',
      campus_highlights_description: college.campus_highlights?.description || '',
      campus_highlights_highlights: college.campus_highlights?.highlights || [],
    })
  }

  // Reset actions
  const resetModalStates = () => {
    setIsModalOpen(false)
    setEditingCollege(null)
    setDeleteModalOpen(false)
    setCollegeToDelete(null)
  }

  const value: CollegeContextType = {
    // Modal states
    isModalOpen,
    editingCollege,
    deleteModalOpen,
    collegeToDelete,

    // Filter and pagination states
    searchTerm,
    selectedCountry,
    currentPage,
    itemsPerPage,

    // Form data
    formData,

    // Modal actions
    openModal,
    closeModal,
    openEditModal,
    openDeleteModal,
    closeDeleteModal,

    // Form actions
    updateFormData,
    setFormData,
    resetForm,
    loadCollegeForEdit,

    // Filter and pagination actions
    setSearchTerm,
    setSelectedCountry,
    setCurrentPage,
    setItemsPerPage,

    // Reset actions
    resetModalStates,
  }

  return (
    <CollegeContext.Provider value={value}>
      {children}
    </CollegeContext.Provider>
  )
}

export const useCollegeContext = () => {
  const context = useContext(CollegeContext)
  if (!context) {
    throw new Error('useCollegeContext must be used within a CollegeProvider')
  }
  return context
}

// Utility function for slug generation
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
