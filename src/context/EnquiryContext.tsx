'use client'

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

interface Enquiry {
  _id: string
  name: string
  email: string
  phone: string
  city: string
  subject: string
  message: string
  status: string
  priority: string
  source: string
  assignedTo?: string | null
  createdAt: string
  updatedAt: string
}

interface EnquiryContextType {
  // Modal states
  isModalOpen: boolean
  selectedEnquiry: Enquiry | null
  deleteModalOpen: boolean
  enquiryToDelete: Enquiry | null

  // Filter and pagination states
  searchTerm: string
  selectedStatus: string
  selectedPriority: string
  currentPage: number
  itemsPerPage: number

  // Modal actions
  openModal: () => void
  closeModal: () => void
  openViewModal: (enquiry: Enquiry) => void
  openDeleteModal: (enquiry: Enquiry) => void
  closeDeleteModal: () => void

  // Filter and pagination actions
  setSearchTerm: (term: string) => void
  setSelectedStatus: (status: string) => void
  setSelectedPriority: (priority: string) => void
  setCurrentPage: Dispatch<SetStateAction<number>>
  setItemsPerPage: Dispatch<SetStateAction<number>>

  // Update actions
  updateSelectedEnquiry: (enquiry: Enquiry | null) => void

  // Reset actions
  resetModalStates: () => void
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined)

export const EnquiryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null)

  // Filter and pagination states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Modal actions
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEnquiry(null)
  }

  const openViewModal = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
    setIsModalOpen(true)
  }

  const openDeleteModal = (enquiry: Enquiry) => {
    setEnquiryToDelete(enquiry)
    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setEnquiryToDelete(null)
  }

  // Update actions
  const updateSelectedEnquiry = (enquiry: Enquiry | null) => {
    setSelectedEnquiry(enquiry)
  }

  // Reset actions
  const resetModalStates = () => {
    setIsModalOpen(false)
    setSelectedEnquiry(null)
    setDeleteModalOpen(false)
    setEnquiryToDelete(null)
  }

  const value: EnquiryContextType = {
    // Modal states
    isModalOpen,
    selectedEnquiry,
    deleteModalOpen,
    enquiryToDelete,

    // Filter and pagination states
    searchTerm,
    selectedStatus,
    selectedPriority,
    currentPage,
    itemsPerPage,

    // Modal actions
    openModal,
    closeModal,
    openViewModal,
    openDeleteModal,
    closeDeleteModal,

    // Filter and pagination actions
    setSearchTerm,
    setSelectedStatus,
    setSelectedPriority,
    setCurrentPage,
    setItemsPerPage,

    // Update actions
    updateSelectedEnquiry,

    // Reset actions
    resetModalStates,
  }

  return (
    <EnquiryContext.Provider value={value}>
      {children}
    </EnquiryContext.Provider>
  )
}

export const useEnquiryContext = () => {
  const context = useContext(EnquiryContext)
  if (!context) {
    throw new Error('useEnquiryContext must be used within an EnquiryProvider')
  }
  return context
}
