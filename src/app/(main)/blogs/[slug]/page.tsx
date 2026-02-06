'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  MessageCircle, 
  ArrowLeft, 
  Share2,
  Tag,
  FileText,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { useBlog } from '@/hooks/useBlogs'

interface Blog {
  _id: string
  title: string
  slug: string
  category: string
  tags: string[]
  content: string
  image?: string
  author?: string
  published_at?: string
  read_time?: number
  views?: number
  comments?: number
  related_exams: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

const BlogDetailPage = () => {
  const params = useParams()
  const slug = params.slug as string
  
  // Use TanStack Query for blog data
  const { 
    data: blog, 
    isLoading, 
    error, 
    refetch 
  } = useBlog(slug)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Article...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {error instanceof Error && error.message === 'Blog not found' ? 'Article not found' : 'Failed to Load Article'}
          </h2>
          <p className="text-slate-500 mb-6">
            {error instanceof Error ? error.message : 'The article you are looking for does not exist.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => refetch()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Try Again
            </Button>
            <Link href="/blogs">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Back to Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blogs">
            <Button variant="ghost" className="mb-4 text-slate-500 hover:text-green-600 font-bold flex gap-2">
              <ArrowLeft size={16} />
              Back to Articles
            </Button>
          </Link>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {blog.category}
            </Badge>
            {blog.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-black bg-slate-50 text-slate-600 px-3 py-1 rounded-lg border border-slate-100">
                #{tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
            {blog.title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-8">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span className="text-xs font-medium">{blog.author || 'Alpha World Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span className="text-xs font-medium">
                {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
            {blog.read_time && (
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span className="text-xs font-medium">{blog.read_time} min read</span>
              </div>
            )}
            {blog.views && (
              <div className="flex items-center gap-2">
                <Eye size={14} />
                <span className="text-xs font-medium">{blog.views} views</span>
              </div>
            )}
            {blog.comments && (
              <div className="flex items-center gap-2">
                <MessageCircle size={14} />
                <span className="text-xs font-medium">{blog.comments} comments</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blog.image && (
        <div className="relative h-96 w-full overflow-hidden bg-slate-100">
          <img
            src={blog.image.startsWith('http') ? blog.image : `/images/${blog.image}`}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-slate-700 leading-relaxed font-medium"
            dangerouslySetInnerHTML={{ 
              __html: blog.content.replace(/\n/g, '<br />') 
            }}
          />
        </div>

        {/* Related Exams */}
        {blog.related_exams.length > 0 && (
          <div className="mt-12 p-8 bg-green-50 rounded-[2rem] border border-green-100">
            <h3 className="font-black text-green-900 mb-4 text-lg">Related Exams</h3>
            <div className="flex flex-wrap gap-3">
              {blog.related_exams.map((exam) => (
                <span key={exam} className="text-sm font-bold bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                  {exam}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        

        {/* Back to Blogs */}
        <div className="mt-12 text-center">
          <Link href="/blogs">
            <Button className="h-14 bg-slate-900 hover:bg-green-600 text-white font-black rounded-2xl transition-all duration-300 px-8">
              Read More Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage