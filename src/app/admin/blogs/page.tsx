'use client'

import React, { useMemo } from 'react'
import { AdminTable, createEditAction, createDeleteAction, createViewAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, FileText, Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAdminBlogsPaginated, useSaveBlog, useDeleteBlog } from '@/hooks/useAdminBlogs'
import { toast } from 'sonner'
import { BlogProvider, useBlogContext } from '@/context/BlogContext'

export interface Blog {
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

function BlogsPageContent() {
  // Use blog context for all state management
  const {
    isModalOpen,
    editingBlog,
    deleteModalOpen,
    blogToDelete,
    searchTerm,
    selectedCategory,
    selectedStatus,
    currentPage,
    itemsPerPage,
    formData,
    setFormData,
    openModal,
    closeModal,
    openEditModal,
    openDeleteModal,
    closeDeleteModal,
    updateFormData,
    resetForm,
    setSearchTerm,
    setSelectedCategory,
    setSelectedStatus,
    setCurrentPage,
    setItemsPerPage,
    resetModalStates,
  } = useBlogContext()

  // TanStack Query hooks
  const { data: paginatedData, isLoading: dataLoading } = useAdminBlogsPaginated(currentPage, itemsPerPage, searchTerm, selectedCategory, selectedStatus)
  const saveBlogMutation = useSaveBlog()
  const deleteBlogMutation = useDeleteBlog()

  const blogs = paginatedData?.blogs || []
  const totalCount = paginatedData?.total || 0
  const serverTotalPages = paginatedData?.totalPages || 0

  const columns = [
    {
      key: 'title' as keyof Blog,
      title: 'Title',
      render: (value: string, record: Blog) => (
        <div className="max-w-md">
          <div className="font-medium text-gray-900 line-clamp-1">{value}</div>
          <div className="text-sm text-gray-500">{record.category}</div>
        </div>
      )
    },
    {
      key: 'tags' as keyof Blog,
      title: 'Tags',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {value.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 3}
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'is_active' as keyof Blog,
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'published' : 'draft'}
        </Badge>
      )
    },
    {
      key: 'createdAt' as keyof Blog,
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const actions = [
    createViewAction((blog: Blog) => {
      // In a real app, this would open a view modal or navigate to view page
      alert(`View blog: ${blog.title}`)
    }),
    createEditAction((blog: Blog) => {
      openEditModal(blog)
    }),
    createDeleteAction((blog: Blog) => {
      openDeleteModal(blog)
    })
  ]

  // Hardcoded educational categories for college and education-related blogs
  const educationalCategories = [
    'College Admissions',
    'Study Abroad', 
    'Exam Preparation',
    'Scholarships & Financial Aid',
    'Career Guidance',
    'University Reviews',
    'Course Selection',
    'Student Life',
    'Education News',
    'Application Tips'
  ]

  const formFields = [
    {
      name: 'title',
      label: 'Blog Title',
      type: 'text' as const,
      placeholder: 'Enter blog title',
      required: true
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text' as const,
      placeholder: 'blog-slug',
      required: true
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      options: [
        { value: 'select-category', label: 'Select a category' },
        ...educationalCategories.map(cat => ({ value: cat, label: cat }))
      ],
      required: true
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'tags' as const,
      placeholder: 'Add tags',
      description: 'Add relevant tags for better categorization'
    },
    {
      name: 'related_exams',
      label: 'Related Exams',
      type: 'tags' as const,
      placeholder: 'Add related exams',
      description: 'Add exams related to this blog post'
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea' as const,
      placeholder: 'Write your blog content here...',
      required: true,
      description: 'Supports rich text formatting (in production)'
    },
    {
      name: 'image',
      label: 'Image URL',
      type: 'text' as const,
      placeholder: 'Enter image URL',
      description: 'Add an image URL for your blog post'
    },
  ]

  const handleAddBlog = () => {
    resetForm()
    openModal()
  }

  const handleSaveBlog = async () => {
    console.log('🔥 BLOG SAVE BUTTON CLICKED! Starting validation...')
    console.log('📝 Current blog formData:', formData)
    console.log('📝 Is editing blog:', editingBlog ? 'YES' : 'NO')
    
    // Collect all missing fields
    const validationErrors = []
    
    console.log('🔍 Checking each blog field for validation...')
    
    // Basic Info Validation
    if (!formData.title?.trim()) {
      validationErrors.push('Blog Title is required')
      console.log('❌ Blog Title validation failed')
    }
    if (!formData.slug?.trim()) {
      validationErrors.push('Blog Slug is required')
      console.log('❌ Blog Slug validation failed')
    }
    if (!formData.category?.trim() || formData.category === 'select-category') {
      validationErrors.push('Blog Category is required')
      console.log('❌ Blog Category validation failed')
    }
    if (!formData.content?.trim()) {
      validationErrors.push('Blog Content is required')
      console.log('❌ Blog Content validation failed')
    }
    if (!formData.tags?.length) {
      validationErrors.push('At least one Blog Tag is required')
      console.log('❌ Blog Tags validation failed')
    }
    
    // Image URL Validation (optional but if provided, should be valid)
    if (formData.image?.trim()) {
      try {
        new URL(formData.image)
        console.log('✅ Blog Image URL is valid')
      } catch {
        validationErrors.push('Blog Image URL must be a valid URL')
        console.log('❌ Blog Image URL is invalid')
      }
    }
    
    console.log('📋 Final validationErrors array:', validationErrors)
    
    // Show alert for missing fields (works for both ADD and EDIT)
    if (validationErrors.length > 0) {
      const alertMessage = `Please fill in the following required fields:\n\n${validationErrors.map((error, index) => `${index + 1}. ${error}`).join('\n')}`
      console.log('🚨 Showing alert for missing blog fields:', alertMessage)
      alert(alertMessage)
      return
    }

    console.log('✅ All blog validation passed! Proceeding to save...')
    try {
      console.log('🚀 Starting blog save process...')
      console.log('📝 Blog form data:', formData)
      
      const payload = {
        ...formData,
        ...(editingBlog && { _id: editingBlog._id })
      }
      
      console.log('📦 Blog request payload:', payload)
      console.log('🔥 About to call saveBlogMutation.mutateAsync...')
      
      await saveBlogMutation.mutateAsync(payload)
      
      console.log('✅ Blog saved successfully!')
      toast.success(editingBlog ? 'Blog post updated successfully!' : 'Blog post created successfully!')
      closeModal()
      resetModalStates()
      
    } catch (error) {
      console.error('❌ Error saving blog:', error)
      console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack available')
      toast.error('Error saving blog: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleDeleteBlog = async () => {
    if (!blogToDelete) return
    
    try {
      await deleteBlogMutation.mutateAsync(blogToDelete._id)
      toast.success('Blog post deleted successfully!')
      closeDeleteModal()
    } catch (error) {
      console.error('Error deleting blog:', error)
      toast.error('Error deleting blog')
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">All Blog Posts</h2>
          <p className="text-sm text-gray-500">
            {totalCount > 0 ? `${((currentPage - 1) * itemsPerPage) + 1}-${Math.min(currentPage * itemsPerPage, totalCount)} of ${totalCount} posts` : '0 posts'}
          </p>
        </div>
        <Button onClick={handleAddBlog} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Blog Post</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="w-full sm:w-48">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {educationalCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-48">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Blogs Table */}
      <AdminTable
        data={blogs}
        columns={columns}
        actions={actions}
        loading={dataLoading}
        emptyMessage="No blog posts found. Add your first blog post to get started."
      />

      {/* Add/Edit Modal */}
      <AdminModal
        open={isModalOpen}
        onOpenChange={closeModal}
        title={editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
        description={editingBlog ? 'Update blog post information' : 'Create a new blog post'}
        onConfirm={handleSaveBlog}
        loading={saveBlogMutation.isPending}
        size="xl"
      >
        <AdminForm
          fields={formFields}
          data={formData as unknown as Record<string, unknown>}
          onChange={(field: string, value: unknown) => {
            console.log(`📝 Blog form field changed: ${field} = ${value}`)
            updateFormData(field, value)
          }}
          loading={saveBlogMutation.isPending}
        />
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        open={deleteModalOpen}
        onOpenChange={(open) => !open && closeDeleteModal()}
        title="Delete Blog Post"
        description={`Are you sure you want to delete "${blogToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteBlog}
        loading={deleteBlogMutation.isPending}
        size="sm"
      >
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FileText className="h-4 w-4" />
          <span>{blogToDelete?.title}</span>
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
              {Array.from({ length: Math.min(5, serverTotalPages) }, (_, i) => {
                let pageNum
                if (serverTotalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= serverTotalPages - 2) {
                  pageNum = serverTotalPages - 4 + i
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

              {serverTotalPages > 5 && (
                <>
                  <span className="px-2 text-sm text-gray-500">...</span>
                  <Button
                    variant={currentPage === serverTotalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(serverTotalPages)}
                    className="w-8 h-8 p-0"
                  >
                    {serverTotalPages}
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, serverTotalPages))}
              disabled={currentPage === serverTotalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function BlogsPage() {
  return (
    <BlogProvider>
      <BlogsPageContent />
    </BlogProvider>
  )
}
