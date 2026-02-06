'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface FormData {
  name: string
  email: string
  number: string
  city: string
}

interface FormModalContextType {
  isOpen: boolean
  formData: FormData
  openModal: () => void
  closeModal: () => void
  updateFormData: (data: Partial<FormData>) => void
  resetForm: () => void
}

const FormModalContext = createContext<FormModalContextType | undefined>(undefined)

export const useFormModal = () => {
  const context = useContext(FormModalContext)
  if (!context) {
    throw new Error('useFormModal must be used within a FormModalProvider')
  }
  return context
}

interface FormModalProviderProps {
  children: ReactNode
}

export const FormModalProvider: React.FC<FormModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    number: '',
    city: ''
  })

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      number: '',
      city: ''
    })
  }

  return (
    <FormModalContext.Provider value={{
      isOpen,
      formData,
      openModal,
      closeModal,
      updateFormData,
      resetForm
    }}>
      {children}
    </FormModalContext.Provider>
  )
}
