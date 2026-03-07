'use client'

import React, { useState, useMemo } from 'react'
import { AdminTable, createViewAction, createDeleteAction, createEditAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
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
import { MessageSquare, Search, Eye, Mail, Phone, Calendar, Edit, CheckCircle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAdminEnquiriesPaginated, useDeleteEnquiry, useUpdateEnquiryStatus } from '@/hooks/useAdminEnquiries'
import { Enquiry } from '@/hooks/useAdminEnquiries'

export default function EnquiriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  
  // API hooks
  const { data: paginatedData, isLoading: dataLoading, refetch } = useAdminEnquiriesPaginated(currentPage, itemsPerPage, searchTerm, selectedStatus, selectedPriority)
  const deleteEnquiryMutation = useDeleteEnquiry()
  const updateEnquiryStatusMutation = useUpdateEnquiryStatus()

  const enquiries = paginatedData?.enquiries || []
  const totalCount = paginatedData?.total || 0
  const serverTotalPages = paginatedData?.totalPages || 0

  // Debug logging
  console.log('🔍 DEBUG: Enquiries page state:', {
    currentPage,
    itemsPerPage,
    searchTerm,
    selectedStatus,
    selectedPriority,
    paginatedData,
    enquiries,
    totalCount,
    serverTotalPages
  })

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedStatus, selectedPriority])

  const columns = [
    {
      key: 'name' as keyof Enquiry,
      title: 'Contact',
      render: (value: string, record: Enquiry) => (
        <div className="max-w-md">
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
          <div className="text-sm text-gray-500">{record.phone}</div>
          <div className="text-sm text-gray-500">{record.city}</div>
        </div>
      )
    },
    {
      key: 'subject' as keyof Enquiry,
      title: 'Subject',
      render: (value: string) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 line-clamp-2">{value}</div>
        </div>
      )
    },
    {
      key: 'priority' as keyof Enquiry,
      title: 'Priority',
      render: (value: string) => {
        const colors = {
          urgent: 'bg-red-100 text-red-800 border-red-200',
          high: 'bg-orange-100 text-orange-800 border-orange-200',
          medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          low: 'bg-green-100 text-green-800 border-green-200'
        }
        return (
          <Badge className={`border ${colors[value as keyof typeof colors] || colors.low}`}>
            {value}
          </Badge>
        )
      }
    },
    {
      key: 'status' as keyof Enquiry,
      title: 'Status',
      render: (value: string, record: Enquiry) => (
        <Select 
          value={value} 
          onValueChange={(newStatus) => handleStatusChange(record._id, newStatus)}
          disabled={updateEnquiryStatusMutation.isPending}
        >
          <SelectTrigger className={`w-32 ${updateEnquiryStatusMutation.isPending ? 'opacity-50' : ''}`}>
            <SelectValue>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  value === 'pending' ? 'bg-gray-500' :
                  value === 'in-progress' ? 'bg-blue-500' :
                  value === 'resolved' ? 'bg-green-500' :
                  'bg-slate-500'
                }`}></div>
                <span className="text-xs">{value}</span>
                {updateEnquiryStatusMutation.isPending && (
                  <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-xs">Pending</span>
              </div>
            </SelectItem>
            <SelectItem value="in-progress">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs">In Progress</span>
              </div>
            </SelectItem>
            <SelectItem value="resolved">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs">Resolved</span>
              </div>
            </SelectItem>
            <SelectItem value="closed">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                <span className="text-xs">Closed</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      )
    },
    {
      key: 'createdAt' as keyof Enquiry,
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return (
          <div className="text-sm">
            <div>{date.toLocaleDateString('en-US')}</div>
            <div className="text-gray-500">{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        )
      }
    }
  ]

  const actions = [
    createViewAction((enquiry: Enquiry) => {
      setSelectedEnquiry(enquiry)
      setIsModalOpen(true)
    }),
    createDeleteAction((enquiry: Enquiry) => {
      setEnquiryToDelete(enquiry)
      setDeleteModalOpen(true)
    })
  ]

  const handleDeleteEnquiry = async () => {
    if (!enquiryToDelete) return
    
    try {
      await deleteEnquiryMutation.mutateAsync(enquiryToDelete._id)
      setDeleteModalOpen(false)
      setEnquiryToDelete(null)
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      console.log(`🔄 [FRONTEND] Changing status for enquiry ${enquiryId} to ${newStatus}`);
      
      await updateEnquiryStatusMutation.mutateAsync({ 
        id: enquiryId, 
        status: newStatus 
      })
      
      // Update the selected enquiry if it's currently open in modal
      if (selectedEnquiry && selectedEnquiry._id === enquiryId) {
        setSelectedEnquiry(prev => prev ? { ...prev, status: newStatus as any } : null)
      }
      
      // Force a refresh to ensure table is updated
      setTimeout(() => {
        refetch()
      }, 500)
      
      console.log(`✅ [FRONTEND] Status changed successfully for ${enquiryId}`);
    } catch (error) {
      console.error('❌ [FRONTEND] Status change error:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
          <p className="text-gray-600">
            {totalCount > 0 ? `${((currentPage - 1) * itemsPerPage) + 1}-${Math.min(currentPage * itemsPerPage, totalCount)} of ${totalCount} enquiries` : '0 enquiries'}
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          variant="outline"
          disabled={dataLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${dataLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search enquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <AdminTable
        data={enquiries}
        columns={columns}
        actions={actions}
        loading={false}
      />

      {/* View Enquiry Modal */}
      <AdminModal
        open={isModalOpen}
        onOpenChange={(open) => !open && setIsModalOpen(false)}
        title="Enquiry Details"
        size="lg"
        showFooter={false}
      >
        {selectedEnquiry && (
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                  <span>{selectedEnquiry.name}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{selectedEnquiry.email}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{selectedEnquiry.phone}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">City</label>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                  <span>{selectedEnquiry.city}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Source</label>
                <Badge variant="outline">{selectedEnquiry.source}</Badge>
              </div>
            </div>

            {/* Enquiry Details */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  {selectedEnquiry.subject}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>
            </div>

            {/* Status and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Select 
                  value={selectedEnquiry.status} 
                  onValueChange={(value) => handleStatusChange(selectedEnquiry._id, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        Pending
                      </div>
                    </SelectItem>
                    <SelectItem value="in-progress">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        In Progress
                      </div>
                    </SelectItem>
                    <SelectItem value="resolved">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Resolved
                      </div>
                    </SelectItem>
                    <SelectItem value="closed">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        Closed
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <Badge className={
                  selectedEnquiry.priority === 'urgent' ? 'bg-red-100 text-red-800 border-red-200' :
                  selectedEnquiry.priority === 'high' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                  selectedEnquiry.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                  'bg-green-100 text-green-800 border-green-200'
                }>
                  {selectedEnquiry.priority}
                </Badge>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Assigned To</label>
                <div>{selectedEnquiry.assignedTo || 'Unassigned'}</div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Created: {new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Updated: {new Date(selectedEnquiry.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        open={deleteModalOpen}
        onOpenChange={(open) => !open && setDeleteModalOpen(false)}
        title="Delete Enquiry"
        size="sm"
        showFooter={false}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this enquiry? This action cannot be undone.
          </p>
          {enquiryToDelete && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">{enquiryToDelete.name}</div>
              <div className="text-sm text-gray-600">{enquiryToDelete.subject}</div>
            </div>
          )}
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteEnquiry}
            >
              Delete Enquiry
            </Button>
          </div>
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
