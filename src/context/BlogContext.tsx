'use client'

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

interface Blog {
  _id: string
  title: string
  slug: string
  category: string
  tags: string[]
  content: string
  image: string
  related_exams: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

interface BlogFormData {
  title: string
  slug: string
  category: string
  tags: string[]
  content: string
  image: string
  related_exams: string[]
  is_active: boolean
}

interface BlogContextType {
  // Modal states
  isModalOpen: boolean
  editingBlog: Blog | null
  deleteModalOpen: boolean
  blogToDelete: Blog | null

  // Filter and pagination states
  searchTerm: string
  selectedCategory: string
  selectedStatus: string
  currentPage: number
  itemsPerPage: number

  // Form data
  formData: BlogFormData

  // Modal actions
  openModal: () => void
  closeModal: () => void
  openEditModal: (blog: Blog) => void
  openDeleteModal: (blog: Blog) => void
  closeDeleteModal: () => void

  // Form actions
  updateFormData: (field: string, value: any) => void
  setFormData: Dispatch<SetStateAction<BlogFormData>>
  resetForm: () => void
  loadBlogForEdit: (blog: Blog) => void

  // Filter and pagination actions
  setSearchTerm: (term: string) => void
  setSelectedCategory: (category: string) => void
  setSelectedStatus: (status: string) => void
  setCurrentPage: Dispatch<SetStateAction<number>>
  setItemsPerPage: Dispatch<SetStateAction<number>>

  // Reset actions
  resetModalStates: () => void
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

const initialFormData: BlogFormData = {
  title: '',
  slug: '',
  category: '',
  tags: [] as string[],
  content: '',
  image: '',
  related_exams: [] as string[],
  is_active: true
}

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null)

  // Filter and pagination states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Form data
  const [formData, setFormData] = useState<BlogFormData>(initialFormData)

  // Modal actions
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setEditingBlog(null)
  }

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog)
    loadBlogForEdit(blog)
    setIsModalOpen(true)
  }

  const openDeleteModal = (blog: Blog) => {
    setBlogToDelete(blog)
    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setBlogToDelete(null)
  }

  // Form actions
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Auto-generate slug when title changes
      ...(field === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title)) ? {
        slug: generateSlug(value as string)
      } : {})
    }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const loadBlogForEdit = (blog: Blog) => {
    console.log('🔍 DEBUG: Loading blog for edit:', blog)

    // Properly extract and set all existing blog data when editing
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      category: blog.category || '',
      tags: blog.tags || [],
      content: blog.content || '',
      image: blog.image || '',
      related_exams: blog.related_exams || [],
      is_active: blog.is_active !== undefined ? blog.is_active : true,
    })

    console.log('📝 Form data after setting:', {
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      tags: blog.tags,
      content: blog.content,
      image: blog.image,
      related_exams: blog.related_exams,
      is_active: blog.is_active
    })
  }

  // Reset actions
  const resetModalStates = () => {
    setIsModalOpen(false)
    setEditingBlog(null)
    setDeleteModalOpen(false)
    setBlogToDelete(null)
  }

  const value: BlogContextType = {
    // Modal states
    isModalOpen,
    editingBlog,
    deleteModalOpen,
    blogToDelete,

    // Filter and pagination states
    searchTerm,
    selectedCategory,
    selectedStatus,
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
    loadBlogForEdit,

    // Filter and pagination actions
    setSearchTerm,
    setSelectedCategory,
    setSelectedStatus,
    setCurrentPage,
    setItemsPerPage,

    // Reset actions
    resetModalStates,
  }

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}

export const useBlogContext = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider')
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
