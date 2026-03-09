'use client'

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

interface Exam {
  _id?: string
  name: string
  slug: string
  short_name: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  is_active: boolean
  display_order: number
  hero_section: {
    title: string
    subtitle: string
    image: string
  }
  overview: {
    title: string
    content: string
    key_highlights: string[]
  }
  registration: {
    title: string
    description: string
    bullet_points: string[]
  }
  exam_pattern: {
    title: string
    description: string
    total_duration_mins: number
    score_range: string
    table_data: {
      section: string
      questions: number
      duration_mins: number
    }[]
  }
  exam_dates: {
    title: string
    important_dates: {
      event: string
      date: Date
    }[]
  },
  result_statistics: {
    title: string
    description: string
    passing_criteria: string
    total_marks: number
    passing_marks: number
  },
  actions?: any
}

interface ExamContextType {
  // Modal states
  isModalOpen: boolean
  editingExam: Exam | null
  activeTab: string

  // Filter and pagination states
  currentPage: number
  itemsPerPage: number

  // Form data
  formData: Exam

  // Modal actions
  openModal: () => void
  closeModal: () => void
  openEditModal: (exam: Exam) => void

  // Form actions
  updateFormData: (field: string, value: any) => void
  setFormData: Dispatch<SetStateAction<Exam>>
  resetForm: () => void
  loadExamForEdit: (exam: Exam) => void
  setActiveTab: Dispatch<SetStateAction<string>>

  // Filter and pagination actions
  setCurrentPage: Dispatch<SetStateAction<number>>
  setItemsPerPage: Dispatch<SetStateAction<number>>

  // Reset actions
  resetModalStates: () => void
}

const ExamContext = createContext<ExamContextType | undefined>(undefined)

const initialFormData: Exam = {
  name: '',
  slug: '',
  short_name: '',
  exam_type: 'International',
  conducting_body: '',
  exam_mode: 'Online',
  frequency: 'Monthly',
  description: '',
  is_active: true,
  display_order: 0,
  hero_section: {
    title: '',
    subtitle: '',
    image: ''
  },
  overview: {
    title: 'Overview',
    content: '',
    key_highlights: [] as string[]
  },
  registration: {
    title: 'Registration',
    description: '',
    bullet_points: [] as string[]
  },
  exam_pattern: {
    title: 'Exam Pattern',
    description: '',
    total_duration_mins: 120,
    score_range: '0-100',
    table_data: [] as Array<{section: string, questions: number, duration_mins: number}>
  },
  exam_dates: {
    title: 'Important Dates',
    important_dates: [] as Array<{event: string, date: Date}>
  },
  result_statistics: {
    title: 'Result Statistics',
    description: '',
    passing_criteria: '',
    total_marks: 100,
    passing_marks: 40
  }
}

export const ExamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<Exam | null>(null)
  const [activeTab, setActiveTab] = useState('basic')

  // Filter and pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Form data
  const [formData, setFormData] = useState<Exam>(initialFormData)

  // Modal actions
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setEditingExam(null)
  }

  const openEditModal = (exam: Exam) => {
    setEditingExam(exam)
    loadExamForEdit(exam)
    setIsModalOpen(true)
  }

  // Form actions
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Auto-generate sensible slug when name changes
      ...(field === 'name' ? { slug: generateSensibleSlug(value as string) } : {})
    }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const loadExamForEdit = (exam: Exam) => {
    console.log('🔍 DEBUG: Loading exam for edit:', exam)

    // Initialize form with ALL existing exam data
    setFormData({
      name: exam.name || '',
      slug: exam.slug || '',
      short_name: exam.short_name || '',
      exam_type: exam.exam_type || 'International',
      conducting_body: exam.conducting_body || '',
      exam_mode: exam.exam_mode || 'Online',
      frequency: exam.frequency || 'Monthly',
      description: exam.description || '',
      is_active: exam.is_active !== undefined ? exam.is_active : true,
      display_order: exam.display_order || 0,
      hero_section: {
        title: exam.hero_section?.title || '',
        subtitle: exam.hero_section?.subtitle || '',
        image: exam.hero_section?.image || ''
      },
      overview: {
        title: exam.overview?.title || 'Overview',
        content: exam.overview?.content || '',
        key_highlights: exam.overview?.key_highlights || []
      },
      registration: {
        title: exam.registration?.title || 'Registration',
        description: exam.registration?.description || '',
        bullet_points: exam.registration?.bullet_points || []
      },
      exam_pattern: {
        title: exam.exam_pattern?.title || 'Exam Pattern',
        description: exam.exam_pattern?.description || '',
        total_duration_mins: exam.exam_pattern?.total_duration_mins || 120,
        score_range: exam.exam_pattern?.score_range || '0-100',
        table_data: exam.exam_pattern?.table_data || []
      },
      exam_dates: {
        title: exam.exam_dates?.title || 'Important Dates',
        important_dates: exam.exam_dates?.important_dates || []
      },
      result_statistics: {
        title: exam.result_statistics?.title || 'Result Statistics',
        description: exam.result_statistics?.description || '',
        passing_criteria: exam.result_statistics?.passing_criteria || '',
        total_marks: exam.result_statistics?.total_marks || 100,
        passing_marks: exam.result_statistics?.passing_marks || 50
      }
    })
  }

  // Reset actions
  const resetModalStates = () => {
    setIsModalOpen(false)
    setEditingExam(null)
  }

  const value: ExamContextType = {
    // Modal states
    isModalOpen,
    editingExam,
    activeTab,

    // Filter and pagination states
    currentPage,
    itemsPerPage,

    // Form data
    formData,

    // Modal actions
    openModal,
    closeModal,
    openEditModal,

    // Form actions
    updateFormData,
    setFormData,
    resetForm,
    loadExamForEdit,
    setActiveTab,

    // Filter and pagination actions
    setCurrentPage,
    setItemsPerPage,

    // Reset actions
    resetModalStates,
  }

  return (
    <ExamContext.Provider value={value}>
      {children}
    </ExamContext.Provider>
  )
}

export const useExamContext = () => {
  const context = useContext(ExamContext)
  if (!context) {
    throw new Error('useExamContext must be used within an ExamProvider')
  }
  return context
}

// Utility function for slug generation
const generateSensibleSlug = (text: string): string => {
  if (!text) return ''

  // Common words to remove from slugs for cleaner URLs
  const stopWords = ['exam', 'test', 'assessment', 'evaluation', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']

  return text
    .toString()
    .toLowerCase()
    .trim()
    // Remove special characters except spaces, hyphens, and letters/numbers
    .replace(/[^\w\s\-]/g, '')
    // Replace multiple spaces with single space
    .replace(/\s+/g, ' ')
    // Remove stop words
    .split(' ')
    .filter(word => word && !stopWords.includes(word))
    .join(' ')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove hyphens from start and end
    .replace(/^-+|-+$/g, '')
    // Limit to reasonable length (50 characters max)
    .substring(0, 50)
}
