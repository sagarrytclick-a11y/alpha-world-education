'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'file' | 'tags'
  placeholder?: string
  options?: { value: string; label: string }[]
  required?: boolean
  disabled?: boolean
  description?: string
}

interface AdminFormProps {
  fields: FormField[]
  data: Record<string, unknown>
  onChange: (field: string, value: unknown) => void
  loading?: boolean
  className?: string
}

export function AdminForm({
  fields,
  data,
  onChange,
  loading = false,
  className = ''
}: AdminFormProps) {
  const [tagInputs, setTagInputs] = React.useState<Record<string, string>>({})
  
  const renderField = (field: FormField) => {
    const value = data[field.name] ?? (field.type === 'checkbox' ? false : field.type === 'number' ? 0 : '')
    
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <Input
            type={field.type}
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            disabled={loading || field.disabled}
            required={field.required}
          />
        )
        
      case 'number':
        return (
          <Input
            type="number"
            value={value as number}
            onChange={(e) => onChange(field.name, Number(e.target.value))}
            placeholder={field.placeholder}
            disabled={loading || field.disabled}
            required={field.required}
          />
        )
        
      case 'textarea':
        return (
          <Textarea
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            disabled={loading || field.disabled}
            required={field.required}
            rows={4}
          />
        )
        
      case 'select':
        return (
          <Select
            value={value as string}
            onValueChange={(newValue) => onChange(field.name, newValue)}
            disabled={loading || field.disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
        
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={value as boolean}
              onCheckedChange={(checked) => onChange(field.name, checked)}
              disabled={loading || field.disabled}
            />
            <Label htmlFor={field.name} className="text-sm font-normal">
              {field.label}
            </Label>
          </div>
        )
        
      case 'file':
        return (
          <div className="space-y-2">
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  onChange(field.name, file)
                }
              }}
              disabled={loading || field.disabled}
              accept="image/*"
            />
            {value && typeof value === 'string' && (
              <div className="text-sm text-gray-500">
                Current: {value}
              </div>
            )}
          </div>
        )
        
      case 'tags':
        const tags = Array.isArray(value) ? value : []
        const newTag = tagInputs[field.name] || ''
        
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string, index: number) => (
                <div className='flex items-center bg-muted rounded-lg px-3 py-1 gap-3' key={index}>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {tag}
                  </Badge>
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      const newTags = tags.filter((_: string, i: number) => i !== index)
                      onChange(field.name, newTags)
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setTagInputs(prev => ({ ...prev, [field.name]: e.target.value }))}
                placeholder="Add a tag..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newTag.trim()) {
                    onChange(field.name, [...tags, newTag.trim()])
                    setTagInputs(prev => ({ ...prev, [field.name]: '' }))
                  }
                }}
                disabled={loading || field.disabled}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (newTag.trim()) {
                    onChange(field.name, [...tags, newTag.trim()])
                    setTagInputs(prev => ({ ...prev, [field.name]: '' }))
                  }
                }}
                disabled={loading || field.disabled}
              >
                Add
              </Button>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {fields.map((field) => (
        <div key={field.name} className="space-y-3">
          {field.type !== 'checkbox' && (
            <Label htmlFor={field.name} className="text-sm font-medium mb-3 block">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
          )}
          {renderField(field)}
          {field.description && (
            <p className="text-xs text-gray-500">{field.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
