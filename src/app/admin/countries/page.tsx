'use client'

import React, { useState } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Plus, Globe, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { generateSlug } from '@/lib/slug'
import { useAdminCountriesPaginated, useSaveCountry, useDeleteCountry } from '@/hooks/useAdminCountries'
import { toast } from 'sonner'

export interface Country {
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

export default function CountriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCountry, setEditingCountry] = useState<Country | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [countryToDelete, setCountryToDelete] = useState<Country | null>(null)
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    flag: '',
    description: '',
    meta_title: '',
    meta_description: '',
    is_active: true
  })
  
  // TanStack Query hooks
  const { data: paginatedData, isLoading: dataLoading } = useAdminCountriesPaginated(currentPage, itemsPerPage)
  const saveCountryMutation = useSaveCountry()
  const deleteCountryMutation = useDeleteCountry()

  const countries = paginatedData?.countries || []
  const totalCount = paginatedData?.total || 0
  const totalPages = paginatedData?.totalPages || 0

  // Debug logging
  console.log('🔍 DEBUG: Countries page state:', {
    currentPage,
    itemsPerPage,
    paginatedData,
    countries,
    totalCount,
    totalPages
  })


  const columns = [
    {
      key: 'name' as keyof Country,
      title: 'Country Name',
      render: (value: string, record: Country) => (
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{record.flag}</span>
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'slug' as keyof Country,
      title: 'Slug'
    },
    {
      key: 'is_active' as keyof Country,
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'active' : 'inactive'}
        </Badge>
      )
    },
    {
      key: 'createdAt' as keyof Country,
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const actions = [
    createEditAction((country: Country) => {
      setEditingCountry(country)
      setFormData({
        name: country.name,
        slug: country.slug,
        flag: country.flag,
        description: country.description,
        meta_title: country.meta_title,
        meta_description: country.meta_description,
        is_active: country.is_active
      })
      setIsModalOpen(true)
    }),
    createDeleteAction((country: Country) => {
      setCountryToDelete(country)
      setDeleteModalOpen(true)
    })
  ]

  const formFields = [
    {
      name: 'name',
      label: 'Country Name',
      type: 'text' as const,
      placeholder: 'Enter country name',
      required: true
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text' as const,
      placeholder: 'country-slug',
      required: true
    },
    {
      name: 'flag',
      label: 'Flag Emoji',
      type: 'text' as const,
      placeholder: '🇺🇸',
      description: 'Enter the flag emoji (e.g., 🇺🇸, 🇬🇧, 🇨🇦)'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Enter country description',
      required: true
    },
    {
      name: 'meta_title',
      label: 'Meta Title',
      type: 'text' as const,
      placeholder: 'Meta title for SEO'
    },
    {
      name: 'meta_description',
      label: 'Meta Description',
      type: 'textarea' as const,
      placeholder: 'Meta description for SEO'
    },
    {
      name: 'is_active',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' }
      ],
      required: true
    }
  ]

  const handleAddCountry = () => {
    setEditingCountry(null)
    setFormData({
      name: '',
      slug: '',
      flag: '',
      description: '',
      meta_title: '',
      meta_description: '',
      is_active: true
    })
    setIsModalOpen(true)
  }

  const handleSaveCountry = async () => {
    console.log('🔥 COUNTRY SAVE BUTTON CLICKED! Starting validation...')
    console.log('📝 Current country formData:', formData)
    console.log('📝 Is editing country:', editingCountry ? 'YES' : 'NO')
    
    // Collect all missing fields
    const validationErrors = []
    
    console.log('🔍 Checking each country field for validation...')
    
    // Basic Info Validation
    if (!formData.name?.trim()) {
      validationErrors.push('Country Name is required')
      console.log('❌ Country Name validation failed')
    }
    if (!formData.slug?.trim()) {
      validationErrors.push('Country Slug is required')
      console.log('❌ Country Slug validation failed')
    }
    if (!formData.description?.trim()) {
      validationErrors.push('Country Description is required')
      console.log('❌ Country Description validation failed')
    }
    
    // Flag Validation (optional but if provided, should be a valid emoji)
    if (formData.flag?.trim()) {
      // Simple emoji validation - check if it contains emoji characters
      const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u
      if (!emojiRegex.test(formData.flag)) {
        validationErrors.push('Flag must be a valid emoji (e.g., 🇺🇸, 🇬🇧, 🇨🇦)')
        console.log('❌ Flag validation failed - invalid emoji')
      } else {
        console.log('✅ Flag validation passed - valid emoji')
      }
    }
    
    // Meta fields validation (optional but if provided, should have reasonable length)
    if (formData.meta_title?.trim() && formData.meta_title.length > 60) {
      validationErrors.push('Meta title should be 60 characters or less for SEO')
      console.log('❌ Meta title validation failed - too long')
    }
    if (formData.meta_description?.trim() && formData.meta_description.length > 160) {
      validationErrors.push('Meta description should be 160 characters or less for SEO')
      console.log('❌ Meta description validation failed - too long')
    }
    
    console.log('📋 Final validationErrors array:', validationErrors)
    
    // Show alert for missing fields (works for both ADD and EDIT)
    if (validationErrors.length > 0) {
      const alertMessage = `Please fill in the following required fields:\n\n${validationErrors.map((error, index) => `${index + 1}. ${error}`).join('\n')}`
      console.log('🚨 Showing alert for missing country fields:', alertMessage)
      alert(alertMessage)
      return
    }

    console.log('✅ All country validation passed! Proceeding to save...')
    try {
      console.log('🚀 Starting country save process...')
      console.log('📝 Country form data:', formData)
      
      const payload = {
        ...formData,
        ...(editingCountry && { _id: editingCountry._id })
      }
      
      console.log('📦 Country request payload:', payload)
      console.log('🔥 About to call saveCountryMutation.mutateAsync...')
      
      await saveCountryMutation.mutateAsync(payload)
      
      console.log('✅ Country saved successfully!')
      toast.success(editingCountry ? 'Country updated successfully!' : 'Country created successfully!')
      setIsModalOpen(false)
      setEditingCountry(null)
      
    } catch (error) {
      console.error('❌ Error saving country:', error)
      console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack available')
      toast.error('Error saving country: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleDeleteCountry = async () => {
    if (!countryToDelete) return
    
    try {
      await deleteCountryMutation.mutateAsync(countryToDelete._id)
      toast.success('Country deleted successfully!')
      setDeleteModalOpen(false)
      setCountryToDelete(null)
    } catch (error) {
      console.error('Error deleting country:', error)
      toast.error('Error deleting country')
    }
  }

  return (
    <div>
    <div className="space-y-6">
      {/* Header with Add button */}
      <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Countries</h2>
            <p className="text-sm text-gray-500">
              {totalCount > 0 ? `${((currentPage - 1) * itemsPerPage) + 1}-${Math.min(currentPage * itemsPerPage, totalCount)} of ${totalCount} countries` : '0 countries'}
            </p>
          </div>
          <Button onClick={handleAddCountry} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Country</span>
          </Button>
        </div>

        {/* Countries Table */}
        <AdminTable
          data={countries}
          columns={columns}
          actions={actions}
          loading={dataLoading}
          emptyMessage="No countries found. Add your first country to get started."
        />

        {/* Add/Edit Modal */}
        <AdminModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={editingCountry ? 'Edit Country' : 'Add New Country'}
          description={editingCountry ? 'Update country information' : 'Add a new country to the system'}
          onConfirm={handleSaveCountry}
          loading={saveCountryMutation.isPending}
          size="lg"
        >
          <AdminForm
            fields={formFields}
            data={formData}
            onChange={(field, value) => {
              setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                // Auto-generate slug when name changes and slug is empty or being edited for the first time
                ...(field === 'name' && (!prev.slug || prev.slug === generateSlug(prev.name)) ? {
                  slug: generateSlug(value as string)
                } : {})
              }))
            }}
            loading={saveCountryMutation.isPending}
          />
        </AdminModal>

        {/* Delete Confirmation Modal */}
        <AdminModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          title="Delete Country"
          description={`Are you sure you want to delete "${countryToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteCountry}
          loading={deleteCountryMutation.isPending}
          size="sm"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="h-4 w-4" />
            <span>{countryToDelete?.name}</span>
          </div>
        </AdminModal>

      {/* Pagination Controls */}
      {totalCount > itemsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Items per page:</span>
            <Select value={itemsPerPage.toString()} onValueChange={(value) => {
              setItemsPerPage(Number(value))
              setCurrentPage(1)
            }}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                )
              })}
              
              {totalPages > 5 && (
                <>
                  <span className="px-2 text-sm text-gray-500">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 p-0"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
