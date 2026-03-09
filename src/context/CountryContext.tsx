'use client'

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
  description: string
  meta_title: string
  meta_description: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

interface CountryFormData {
  name: string
  slug: string
  flag: string
  description: string
  meta_title: string
  meta_description: string
  is_active: boolean
}

interface CountryContextType {
  // Modal states
  isModalOpen: boolean
  editingCountry: Country | null
  deleteModalOpen: boolean
  countryToDelete: Country | null

  // Pagination states
  currentPage: number
  itemsPerPage: number

  // Form data
  formData: CountryFormData

  // Modal actions
  openModal: () => void
  closeModal: () => void
  openEditModal: (country: Country) => void
  openDeleteModal: (country: Country) => void
  closeDeleteModal: () => void

  // Form actions
  updateFormData: (field: string, value: any) => void
  setFormData: Dispatch<SetStateAction<CountryFormData>>
  resetForm: () => void
  loadCountryForEdit: (country: Country) => void

  // Pagination actions
  setCurrentPage: Dispatch<SetStateAction<number>>
  setItemsPerPage: Dispatch<SetStateAction<number>>

  // Reset actions
  resetModalStates: () => void
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

const initialFormData: CountryFormData = {
  name: '',
  slug: '',
  flag: '',
  description: '',
  meta_title: '',
  meta_description: '',
  is_active: true
}

export const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCountry, setEditingCountry] = useState<Country | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [countryToDelete, setCountryToDelete] = useState<Country | null>(null)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Form data
  const [formData, setFormData] = useState<CountryFormData>(initialFormData)

  // Modal actions
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCountry(null)
  }

  const openEditModal = (country: Country) => {
    setEditingCountry(country)
    loadCountryForEdit(country)
    setIsModalOpen(true)
  }

  const openDeleteModal = (country: Country) => {
    setCountryToDelete(country)
    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setCountryToDelete(null)
  }

  // Form actions
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Auto-generate slug when name changes
      ...(field === 'name' && (!prev.slug || prev.slug === generateSlug(prev.name)) ? {
        slug: generateSlug(value as string)
      } : {})
    }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const loadCountryForEdit = (country: Country) => {
    console.log('🔍 DEBUG: Loading country for edit:', country)

    setFormData({
      name: country.name || '',
      slug: country.slug || '',
      flag: country.flag || '',
      description: country.description || '',
      meta_title: country.meta_title || '',
      meta_description: country.meta_description || '',
      is_active: country.is_active !== undefined ? country.is_active : true,
    })

    console.log('📝 Form data after setting:', {
      name: country.name,
      slug: country.slug,
      flag: country.flag,
      description: country.description,
      meta_title: country.meta_title,
      meta_description: country.meta_description,
      is_active: country.is_active
    })
  }

  // Reset actions
  const resetModalStates = () => {
    setIsModalOpen(false)
    setEditingCountry(null)
    setDeleteModalOpen(false)
    setCountryToDelete(null)
  }

  const value: CountryContextType = {
    // Modal states
    isModalOpen,
    editingCountry,
    deleteModalOpen,
    countryToDelete,

    // Pagination states
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
    loadCountryForEdit,

    // Pagination actions
    setCurrentPage,
    setItemsPerPage,

    // Reset actions
    resetModalStates,
  }

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  )
}

export const useCountryContext = () => {
  const context = useContext(CountryContext)
  if (!context) {
    throw new Error('useCountryContext must be used within a CountryProvider')
  }
  return context
}

// Utility function for slug generation
const generateSlug = (text: string): string => {
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
    .filter(word => word && !['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'].includes(word))
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
