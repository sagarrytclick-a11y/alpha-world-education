'use client'

import { ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Eye } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface Column<T> {
  key: string
  title: string
  render?: (value: any, record: T, index: number) => ReactNode
  width?: string
}

interface Action<T> {
  label: string
  icon?: ReactNode
  onClick: (record: T, index: number) => void
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  disabled?: boolean
}

interface AdminTableProps<T> {
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
  loading?: boolean
  emptyMessage?: string
  className?: string
}

export function AdminTable<T = Record<string, unknown>>({
  data,
  columns,
  actions,
  loading = false,
  emptyMessage = 'No data available',
  className = ''
}: AdminTableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-8" />
          </div>
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 text-gray-500">
        <div className="text-base sm:text-lg font-medium mb-2">{emptyMessage}</div>
        <div className="text-sm">No records found</div>
      </div>
    )
  }

  return (
    <div className={`rounded-md border overflow-x-auto ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead 
                key={String(column.key)} 
                style={{ width: column.width }}
              >
                {column.title}
              </TableHead>
            ))}
            {actions && actions.length > 0 && (
              <TableHead className="w-24">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
  {(() => {
    try {
      const value = (record as any)[column.key];

      // 1. If a custom render function is provided, use it
      if (column.render) {
        const rendered = column.render(value, record, index);
        // Safety: If the render function accidentally returns an object, stringify it
        return typeof rendered === 'object' && rendered !== null && !Array.isArray(rendered) && !(rendered as any).$$typeof
          ? JSON.stringify(rendered)
          : rendered;
      }

      // 2. Handle null or undefined
      if (value === undefined || value === null) {
        return <span className="text-gray-400">N/A</span>;
      }

      // 3. Handle Dates
      if (value instanceof Date) {
        return value.toLocaleDateString();
      }

      // 4. Handle Objects (The culprit)
      if (typeof value === 'object') {
        // If it's a specific object like your University data, 
        // we extract the most useful string (title or name)
        const displayValue = value.title || value.name || value.label;
        
        if (displayValue && typeof displayValue === 'string') {
          return displayValue;
        }

        // Fallback: Just stringify the whole thing so it doesn't crash
        return <span className="text-xs text-gray-400 font-mono">{JSON.stringify(value)}</span>;
      }

      // 5. Default for strings, numbers, booleans
      return String(value);
    } catch (error) {
      console.error('Error rendering table cell:', error);
      return <span className="text-destructive">Render Error</span>;
    }
  })()}
</TableCell>
              ))}
              {actions && actions.length > 0 && (
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant={action.variant || 'ghost'}
                        size="sm"
                        onClick={() => action.onClick(record, index)}
                        disabled={action.disabled}
                      >
                        {action.icon || action.label}
                      </Button>
                    ))}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Default action creators
export const createEditAction = <T,>(
  onEdit: (record: T, index: number) => void
): Action<T> => ({
  label: 'Edit',
  icon: <Pencil className="h-4 w-4" />,
  onClick: onEdit,
  variant: 'ghost'
})

export const createDeleteAction = <T,>(
  onDelete: (record: T, index: number) => void
): Action<T> => ({
  label: 'Delete',
  icon: <Trash2 className="h-4 w-4" />,
  onClick: onDelete,
  variant: 'ghost'
})

export const createViewAction = <T,>(
  onView: (record: T, index: number) => void
): Action<T> => ({
  label: 'View',
  icon: <Eye className="h-4 w-4" />,
  onClick: onView,
  variant: 'ghost'
})
