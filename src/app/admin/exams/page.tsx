'use client'

import { useState } from 'react'
import { AdminTable } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import { generateSlug } from '@/lib/slug'
import { useAdminExams, useSaveExam, useDeleteExam } from '@/hooks/useAdminExams'
import { toast } from 'sonner'

// Function to generate a sensible and clean slug
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
  actions?: any // Add actions key for the dropdown column
}

export default function SimpleExamsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<Exam | null>(null)
  const [activeTab, setActiveTab] = useState('basic')

  const [formData, setFormData] = useState<Exam>({
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
  })
  
  // TanStack Query hooks
  const { data: exams = [], isLoading: dataLoading } = useAdminExams()
  const saveExamMutation = useSaveExam()
  const deleteExamMutation = useDeleteExam()


  const handleSaveExam = async () => {
    console.log('🔥 EXAM SAVE BUTTON CLICKED! Starting validation...')
    console.log('📝 Current exam formData:', formData)
    console.log('📝 Is editing exam:', editingExam ? 'YES' : 'NO')
    
    // Collect all missing fields
    const validationErrors = []
    
    console.log('🔍 Checking each exam field for validation...')
    
    // Basic Info Validation
    if (!formData.name?.trim()) {
      validationErrors.push('Exam Name is required')
      console.log('❌ Exam Name validation failed')
    }
    if (!formData.slug?.trim()) {
      validationErrors.push('Exam Slug is required')
      console.log('❌ Exam Slug validation failed')
    }
    if (!formData.short_name?.trim()) {
      validationErrors.push('Exam Short Name is required')
      console.log('❌ Exam Short Name validation failed')
    }
    if (!formData.exam_type?.trim()) {
      validationErrors.push('Exam Type is required')
      console.log('❌ Exam Type validation failed')
    }
    if (!formData.conducting_body?.trim()) {
      validationErrors.push('Conducting Body is required')
      console.log('❌ Conducting Body validation failed')
    }
    if (!formData.exam_mode?.trim()) {
      validationErrors.push('Exam Mode is required')
      console.log('❌ Exam Mode validation failed')
    }
    if (!formData.frequency?.trim()) {
      validationErrors.push('Frequency is required')
      console.log('❌ Frequency validation failed')
    }
    if (!formData.description?.trim()) {
      validationErrors.push('Description is required')
      console.log('❌ Description validation failed')
    }
    
    // Hero Section Validation
    if (!formData.hero_section?.title?.trim()) {
      validationErrors.push('Hero Title is required')
      console.log('❌ Hero Title validation failed')
    }
    if (!formData.hero_section?.subtitle?.trim()) {
      validationErrors.push('Hero Subtitle is required')
      console.log('❌ Hero Subtitle validation failed')
    }
    if (!formData.hero_section?.image?.trim()) {
      validationErrors.push('Hero Image is required')
      console.log('❌ Hero Image validation failed')
    }
    
    // Overview Validation
    if (!formData.overview?.title?.trim()) {
      validationErrors.push('Overview Title is required')
      console.log('❌ Overview Title validation failed')
    }
    if (!formData.overview?.content?.trim()) {
      validationErrors.push('Overview Content is required')
      console.log('❌ Overview Content validation failed')
    }
    if (!formData.overview?.key_highlights?.length) {
      validationErrors.push('At least one Key Highlight is required')
      console.log('❌ Key Highlights validation failed')
    }
    
    // Registration Validation
    if (!formData.registration?.title?.trim()) {
      validationErrors.push('Registration Title is required')
      console.log('❌ Registration Title validation failed')
    }
    if (!formData.registration?.description?.trim()) {
      validationErrors.push('Registration Description is required')
      console.log('❌ Registration Description validation failed')
    }
    if (!formData.registration?.bullet_points?.length) {
      validationErrors.push('At least one Bullet Point is required')
      console.log('❌ Bullet Points validation failed')
    }
    
    // Exam Pattern Validation
    if (!formData.exam_pattern?.title?.trim()) {
      validationErrors.push('Exam Pattern Title is required')
      console.log('❌ Exam Pattern Title validation failed')
    }
    if (!formData.exam_pattern?.description?.trim()) {
      validationErrors.push('Exam Pattern Description is required')
      console.log('❌ Exam Pattern Description validation failed')
    }
    if (!formData.exam_pattern?.total_duration_mins || formData.exam_pattern.total_duration_mins <= 0) {
      validationErrors.push('Total Duration must be greater than 0')
      console.log('❌ Total Duration validation failed')
    }
    if (!formData.exam_pattern?.score_range?.trim()) {
      validationErrors.push('Score Range is required')
      console.log('❌ Score Range validation failed')
    }
    if (!formData.exam_pattern?.table_data?.length) {
      validationErrors.push('At least one Table Row is required')
      console.log('❌ Table Data validation failed')
    }
    
    // Exam Dates Validation
    if (!formData.exam_dates?.title?.trim()) {
      validationErrors.push('Exam Dates Title is required')
      console.log('❌ Exam Dates Title validation failed')
    }
    if (!formData.exam_dates?.important_dates?.length) {
      validationErrors.push('At least one Important Date is required')
      console.log('❌ Important Dates validation failed')
    }
    
    // Result Statistics Validation
    if (!formData.result_statistics?.title?.trim()) {
      validationErrors.push('Result Statistics Title is required')
      console.log('❌ Result Statistics Title validation failed')
    }
    if (!formData.result_statistics?.description?.trim()) {
      validationErrors.push('Result Statistics Description is required')
      console.log('❌ Result Statistics Description validation failed')
    }
    if (!formData.result_statistics?.passing_criteria?.trim()) {
      validationErrors.push('Passing Criteria is required')
      console.log('❌ Passing Criteria validation failed')
    }
    if (!formData.result_statistics?.total_marks || formData.result_statistics.total_marks <= 0) {
      validationErrors.push('Total Marks must be greater than 0')
      console.log('❌ Total Marks validation failed')
    }
    if (!formData.result_statistics?.passing_marks || formData.result_statistics.passing_marks < 0) {
      validationErrors.push('Passing Marks must be 0 or greater')
      console.log('❌ Passing Marks validation failed')
    }
    
    console.log('📋 Final validationErrors array:', validationErrors)
    
    // Show alert for missing fields
    if (validationErrors.length > 0) {
      const alertMessage = `Please fill in the following required fields:\n\n${validationErrors.map((error, index) => `${index + 1}. ${error}`).join('\n')}`
      console.log('🚨 Showing alert for missing exam fields:', alertMessage)
      alert(alertMessage)
      return
    }

    console.log('✅ All exam validation passed! Proceeding to save...')
    try {
      console.log('🚀 Starting exam save process...')
      console.log('📝 Exam form data:', formData)
      
      const payload = {
        ...formData,
        ...(editingExam && { _id: editingExam._id })
      }
      
      console.log('📦 Exam request payload:', payload)
      console.log('🔥 About to call saveExamMutation.mutateAsync...')
      
      await saveExamMutation.mutateAsync(payload)
      
      console.log('✅ Exam saved successfully!')
      toast.success(editingExam ? 'Exam updated successfully!' : 'Exam created successfully!')
      setIsModalOpen(false)
      setEditingExam(null)
      
    } catch (error) {
      console.error('❌ Error saving exam:', error)
      console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack available')
      toast.error('Error saving exam: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleEditExam = (exam: Exam) => {
    console.log('🔍 DEBUG: Loading exam for edit:', exam)
    
    setEditingExam(exam)
    
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
    setIsModalOpen(true)
  }

  const handleAddExam = () => {
    setEditingExam(null)
    setFormData({
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
        key_highlights: []
      },
      registration: {
        title: 'Registration',
        description: '',
        bullet_points: []
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
        important_dates: []
      },
      result_statistics: {
        title: 'Result Statistics',
        description: '',
        passing_criteria: '',
        total_marks: 100,
        passing_marks: 40
      }
    })
    setActiveTab('basic')
    setIsModalOpen(true)
  }

  const basicFields = [
    { name: 'name', label: 'Exam Name', type: 'text' as const, required: true },
    { name: 'slug', label: 'Slug', type: 'text' as const, required: true },
    { name: 'short_name', label: 'Short Name', type: 'text' as const, required: true },
    { 
      name: 'exam_type', 
      label: 'Exam Type', 
      type: 'select' as const,
      options: [
        { value: 'International', label: 'International' },
        { value: 'National', label: 'National' }
      ],
      required: true
    },
    { name: 'conducting_body', label: 'Conducting Body', type: 'text' as const, required: true },
    {
      name: 'exam_mode',
      label: 'Exam Mode',
      type: 'select' as const,
      options: [
        { value: 'Online', label: 'Online' },
        { value: 'Offline', label: 'Offline' },
        { value: 'Hybrid', label: 'Hybrid' }
      ],
      required: true
    },
    {
      name: 'frequency',
      label: 'Frequency',
      type: 'select' as const,
      options: [
        { value: 'Once a year', label: 'Once a year' },
        { value: 'Twice a year', label: 'Twice a year' },
        { value: 'Quarterly', label: 'Quarterly' },
        { value: 'Monthly', label: 'Monthly' }
      ],
      required: true
    },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true }
  ]

  const columns = [
    {
      key: 'name' as keyof Exam,
      title: 'Exam Name',
      render: (value: string, record: Exam) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{record.short_name}</div>
        </div>
      )
    },
    {
      key: 'exam_type' as keyof Exam,
      title: 'Type',
      render: (value: string) => <Badge variant="outline">{value}</Badge>
    },
    {
      key: 'conducting_body' as keyof Exam,
      title: 'Conducting Body'
    },
    {
      key: 'is_active' as keyof Exam,
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    {
      key: 'actions' as keyof Exam,
      title: 'Actions',
      render: (value: any, record: Exam) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              console.log("View exam:", record)
              alert(`Viewing exam: ${record.name}`)
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              console.log("Edit exam:", record)
              handleEditExam(record)
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={async () => {
              if (confirm(`Are you sure you want to delete "${record.name}"?`)) {
                try {
                  await deleteExamMutation.mutateAsync(record._id!)
                  toast.success('Exam deleted successfully!')
                } catch (error) {
                  toast.error('Error deleting exam')
                }
              }
            }}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Simple Exams Management</h2>
        <Button onClick={handleAddExam}>
          <Plus className="h-4 w-4 mr-2" />
          Add Exam
        </Button>
      </div>

      <AdminTable
        data={exams}
        columns={columns}
        loading={false}
      />

      <AdminModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        title="Manage Exam"
        showFooter={false}
        size="xl"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="pattern">Pattern</TabsTrigger>
            <TabsTrigger value="dates">Dates</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <AdminForm
              fields={basicFields}
              data={formData as unknown as Record<string, unknown>}
              onChange={(name, value) => {
                setFormData(prev => ({ ...prev, [name]: value }))
                // Auto-generate sensible slug when name changes
                if (name === 'name') {
                  const slug = generateSensibleSlug(value as string)
                  setFormData(prev => ({ ...prev, slug: slug }))
                }
              }}
            />
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hero Title</label>
              <Input
                value={formData.hero_section.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  hero_section: { ...prev.hero_section, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
              <Input
                value={formData.hero_section.subtitle}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  hero_section: { ...prev.hero_section, subtitle: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hero Image</label>
              <Input
                value={formData.hero_section.image}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  hero_section: { ...prev.hero_section, image: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Overview Title</label>
              <Input
                value={formData.overview.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  overview: { ...prev.overview, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Overview Content</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
                value={formData.overview.content}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  overview: { ...prev.overview, content: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Key Highlights</label>
              {formData.overview.key_highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={highlight}
                    onChange={(e) => {
                      const newHighlights = [...formData.overview.key_highlights]
                      newHighlights[index] = e.target.value
                      setFormData(prev => ({
                        ...prev,
                        overview: { ...prev.overview, key_highlights: newHighlights }
                      }))
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newHighlights = formData.overview.key_highlights.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        overview: { ...prev.overview, key_highlights: newHighlights }
                      }))
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  overview: { ...prev.overview, key_highlights: [...prev.overview.key_highlights, ''] }
                }))}
              >
                Add Highlight
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="registration" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Registration Title</label>
              <Input
                value={formData.registration.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  registration: { ...prev.registration, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Registration Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                value={formData.registration.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  registration: { ...prev.registration, description: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bullet Points</label>
              {formData.registration.bullet_points.map((point, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={point}
                    onChange={(e) => {
                      const newPoints = [...formData.registration.bullet_points]
                      newPoints[index] = e.target.value
                      setFormData(prev => ({
                        ...prev,
                        registration: { ...prev.registration, bullet_points: newPoints }
                      }))
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newPoints = formData.registration.bullet_points.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        registration: { ...prev.registration, bullet_points: newPoints }
                      }))
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  registration: { ...prev.registration, bullet_points: [...prev.registration.bullet_points, ''] }
                }))}
              >
                Add Bullet Point
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="pattern" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Pattern Title</label>
              <Input
                value={formData.exam_pattern.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pattern Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                value={formData.exam_pattern.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, description: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Duration (Minutes)</label>
              <Input
                type="number"
                value={formData.exam_pattern.total_duration_mins}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, total_duration_mins: parseInt(e.target.value) || 120 }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Score Range</label>
              <Input
                value={formData.exam_pattern.score_range}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, score_range: e.target.value }
                }))}
                placeholder="e.g., 0-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Table Data</label>
              {formData.exam_pattern.table_data.map((row, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Section"
                    value={row.section}
                    onChange={(e) => {
                      const newTableData = [...formData.exam_pattern.table_data]
                      newTableData[index] = { ...row, section: e.target.value }
                      setFormData(prev => ({
                        ...prev,
                        exam_pattern: { ...prev.exam_pattern, table_data: newTableData }
                      }))
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Questions"
                    value={row.questions}
                    onChange={(e) => {
                      const newTableData = [...formData.exam_pattern.table_data]
                      newTableData[index] = { ...row, questions: parseInt(e.target.value) || 0 }
                      setFormData(prev => ({
                        ...prev,
                        exam_pattern: { ...prev.exam_pattern, table_data: newTableData }
                      }))
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Duration (mins)"
                    value={row.duration_mins}
                    onChange={(e) => {
                      const newTableData = [...formData.exam_pattern.table_data]
                      newTableData[index] = { ...row, duration_mins: parseInt(e.target.value) || 0 }
                      setFormData(prev => ({
                        ...prev,
                        exam_pattern: { ...prev.exam_pattern, table_data: newTableData }
                      }))
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newTableData = formData.exam_pattern.table_data.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        exam_pattern: { ...prev.exam_pattern, table_data: newTableData }
                      }))
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, table_data: [...prev.exam_pattern.table_data, { section: '', questions: 0, duration_mins: 0 }] }
                }))}
              >
                Add Row
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="dates" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Dates Title</label>
              <Input
                value={formData.exam_dates.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_dates: { ...prev.exam_dates, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Important Dates</label>
              {formData.exam_dates.important_dates.map((date, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Event"
                    value={date.event}
                    onChange={(e) => {
                      const newDates = [...formData.exam_dates.important_dates]
                      newDates[index] = { ...date, event: e.target.value }
                      setFormData(prev => ({
                        ...prev,
                        exam_dates: { ...prev.exam_dates, important_dates: newDates }
                      }))
                    }}
                  />
                  <Input
                    type="date"
                    value={date.date ? new Date(date.date).toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const newDates = [...formData.exam_dates.important_dates]
                      newDates[index] = { ...date, date: new Date(e.target.value) }
                      setFormData(prev => ({
                        ...prev,
                        exam_dates: { ...prev.exam_dates, important_dates: newDates }
                      }))
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newDates = formData.exam_dates.important_dates.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        exam_dates: { ...prev.exam_dates, important_dates: newDates }
                      }))
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  exam_dates: { ...prev.exam_dates, important_dates: [...prev.exam_dates.important_dates, { event: '', date: new Date() }] }
                }))}
              >
                Add Date
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Results Title</label>
              <Input
                value={formData.result_statistics.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Results Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                value={formData.result_statistics.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, description: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Passing Criteria</label>
              <Input
                value={formData.result_statistics.passing_criteria}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, passing_criteria: e.target.value }
                }))}
                placeholder="e.g., 40% or 160/400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Marks</label>
              <Input
                type="number"
                value={formData.result_statistics.total_marks}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, total_marks: parseInt(e.target.value) || 100 }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Passing Marks</label>
              <Input
                type="number"
                value={formData.result_statistics.passing_marks}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, passing_marks: parseInt(e.target.value) || 40 }
                }))}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveExam} disabled={saveExamMutation.isPending}>
            {saveExamMutation.isPending ? 'Saving...' : 'Save Exam'}
          </Button>
        </div>
      </AdminModal>
    </div>
  )
}
