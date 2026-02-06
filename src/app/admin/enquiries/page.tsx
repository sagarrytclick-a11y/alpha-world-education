'use client'

import React, { useState, useMemo } from 'react'
import { AdminTable, createViewAction, createDeleteAction } from '@/components/admin/AdminTable'
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
import { MessageSquare, Search, Eye, Mail, Phone, Calendar } from 'lucide-react'
import { useAdminEnquiries, useDeleteEnquiry } from '@/hooks/useAdminEnquiries'
import { Enquiry } from '@/hooks/useAdminEnquiries'

export default function EnquiriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  
  // API hooks
  const { data: enquiries = [], isLoading: dataLoading } = useAdminEnquiries()
  const deleteEnquiryMutation = useDeleteEnquiry()

  // Filter enquiries based on search, status, and priority using useMemo
  const filteredEnquiries = useMemo(() => {
    let filtered = enquiries

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((enquiry: Enquiry) => enquiry.status === selectedStatus)
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter((enquiry: Enquiry) => enquiry.priority === selectedPriority)
    }

    if (searchTerm) {
      filtered = filtered.filter((enquiry: Enquiry) => 
        enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [enquiries, searchTerm, selectedStatus, selectedPriority])

  const columns = [
    {
      key: 'name' as keyof Enquiry,
      title: 'Contact',
      render: (value: string, record: Enquiry) => (
        <div className="max-w-md">
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
          <div className="text-sm text-gray-500">{record.phone}</div>
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
      render: (value: string) => {
        const colors = {
          pending: 'bg-gray-100 text-gray-800 border-gray-200',
          'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
          resolved: 'bg-green-100 text-green-800 border-green-200',
          closed: 'bg-slate-100 text-slate-800 border-slate-200'
        }
        return (
          <Badge className={`border ${colors[value as keyof typeof colors] || colors.pending}`}>
            {value}
          </Badge>
        )
      }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
          <p className="text-gray-600">Manage student enquiries and support requests</p>
        </div>
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
        data={filteredEnquiries}
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
                <Badge className={
                  selectedEnquiry.status === 'pending' ? 'bg-gray-100 text-gray-800 border-gray-200' :
                  selectedEnquiry.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                  selectedEnquiry.status === 'resolved' ? 'bg-green-100 text-green-800 border-green-200' :
                  'bg-slate-100 text-slate-800 border-slate-200'
                }>
                  {selectedEnquiry.status}
                </Badge>
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
    </div>
  )
}
