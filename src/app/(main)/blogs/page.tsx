'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Calendar, Tag, FileText, Clock, Image as ImageIcon, User, Eye, MessageCircle, ArrowRight, X, Filter, AlertCircle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { useBlogs } from '@/hooks/useBlogs'

// Structured Data Component
const BlogStructuredData = ({ blogs, currentPage, totalPages, searchTerm, selectedCategory, paginatedBlogs, filteredBlogs, itemsPerPage }: { 
  blogs: Blog[], 
  currentPage: number, 
  totalPages: number,
  searchTerm: string,
  selectedCategory: string,
  paginatedBlogs: Blog[],
  filteredBlogs: Blog[],
  itemsPerPage: number
}) => {
  const blogStructuredData = paginatedBlogs.map((blog, index) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.content.substring(0, 160) + (blog.content.length > 160 ? "..." : ""),
    "image": blog.image || `https://picsum.photos/seed/${blog.slug}/600/400`,
    "author": {
      "@type": "Organization",
      "name": "Alpha World Education",
      "url": "https://alphaworldeducation.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Alpha World Education",
      "logo": {
        "@type": "ImageObject",
        "url": "https://alphaworldeducation.com/images/logo.png"
      }
    },
    "datePublished": blog.published_at || blog.createdAt,
    "dateModified": blog.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://alphaworldeducation.com/blogs/${blog.slug}`
    },
    "url": `https://alphaworldeducation.com/blogs/${blog.slug}`,
    "keywords": blog.tags.join(", "),
    "category": blog.category,
    "articleSection": "Educational Resources",
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "Blog",
      "name": "Alpha World Education Blog",
      "description": "Expert insights, study tips, and success stories from our education consultants.",
      "url": "https://alphaworldeducation.com/blogs"
    }
  }))

  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Latest Articles - Alpha World Education Blog",
    "description": searchTerm || selectedCategory !== 'all' 
      ? `Browse ${selectedCategory !== 'all' ? selectedCategory + ' articles' : 'search results for: ' + searchTerm} from Alpha World Education. Expert insights on study abroad, exam preparation, and international education.`
      : "Explore the latest articles from Alpha World Education. Expert insights, study tips, and success stories from our education consultants.",
    "url": `https://alphaworldeducation.com/blogs${searchTerm ? '?search=' + searchTerm : ''}${selectedCategory !== 'all' ? '?category=' + selectedCategory : ''}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredBlogs.length,
      "itemListElement": blogStructuredData.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1 + ((currentPage - 1) * itemsPerPage),
        "item": item
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://alphaworldeducation.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://alphaworldeducation.com/blogs"
        }
      ]
    },
    "provider": {
      "@type": "Organization",
      "name": "Alpha World Education",
      "url": "https://alphaworldeducation.com",
      "sameAs": [
        "https://www.facebook.com/AlphaWorldEducation",
        "https://www.twitter.com/AlphaWorldEdu",
        "https://www.linkedin.com/company/alpha-world-education"
      ]
    },
    "about": {
      "@type": "Thing",
      "name": "International Education",
      "description": "Study abroad programs, university admissions, and educational consulting services"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionStructuredData, null, 2)
        }}
      />
      {blogStructuredData.map((blogData, index) => (
        <script
          key={`blog-structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogData, null, 2)
          }}
        />
      ))}
    </>
  )
}

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

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)

  // Use TanStack Query for blogs data
  const {
    data: blogs = [],
    isLoading,
    error,
    refetch
  } = useBlogs()

  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    let filtered = blogs

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory)
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchLower) ||
        blog.content.toLowerCase().includes(searchLower) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    return filtered
  }, [blogs, searchTerm, selectedCategory])

  // Pagination logic
  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredBlogs.slice(startIndex, endIndex)
  }, [filteredBlogs, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  // Extract unique categories
  const categories = useMemo(() =>
    [...new Set(blogs.map(blog => blog.category))],
    [blogs]
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Articles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to Load Articles</h2>
          <p className="text-slate-500 mb-6">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
          <Button
            onClick={() => refetch()}
            className="bg-green-600 hover:bg-green-700 text-white font-medium"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <BlogStructuredData 
        blogs={blogs}
        currentPage={currentPage}
        totalPages={totalPages}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        paginatedBlogs={paginatedBlogs}
        filteredBlogs={filteredBlogs}
        itemsPerPage={itemsPerPage}
      />
      <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Header - Same Style as Other Pages */}
      <div className="bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none mb-4 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Educational Insights
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                LATEST <span className="text-green-600">ARTICLES</span>
              </h1>
              <p className="text-slate-500 mt-2 font-medium max-w-md leading-relaxed">
                Expert insights, study tips, and success stories from our education consultants.
                Stay updated with the latest trends in international education, exam preparation strategies,
                visa guidance, and university admission processes to make your study abroad journey successful.
              </p>
            </div>
            <div className="bg-white shadow-sm border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{filteredBlogs.length}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Articles Published</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section - Floating Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-green-600" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-slate-50 border-none h-12 rounded-xl font-medium focus-visible:ring-2 focus-visible:ring-green-500"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl font-medium">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="h-12 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl font-bold flex gap-2"
            >
              <X size={16} /> Reset
            </Button>

            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Filter size={16} />
              <span>{filteredBlogs.length} results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={32} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">No articles found</h3>
            <p className="text-slate-500 font-medium mb-4 max-w-md mx-auto">
              We couldn't find any articles matching your search criteria. Try adjusting your keywords,
              exploring different categories, or browse our comprehensive collection of educational resources
              covering study abroad tips, exam preparation, visa guidance, and university admissions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                Browse All Articles
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/contact'}
                className="border-green-600 text-green-600 hover:bg-green-50 font-medium"
              >
                Get Expert Help
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBlogs.map((blog) => (
              <Card key={blog._id} className="group cursor-pointer border py-0 border-gray-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white flex flex-col h-full">
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={blog.image || `https://picsum.photos/seed/${blog.slug}/600/400`}
                    alt={blog.title}
                    width={600}
                    height={400}
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 backdrop-blur-md text-green-700 hover:bg-white border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm">
                      {blog.category}
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-xl text-white line-clamp-2 leading-tight group-hover:text-green-400 transition-colors">
                      {blog.title}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-grow">
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
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
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
                    {blog.content}
                  </p>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span key={`${tag}-${index}`} className="text-[10px] font-black bg-slate-50 text-slate-600 px-3 py-1 rounded-lg border border-slate-100">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}


                  {/* Related Exams */}
                  {blog.related_exams && blog.related_exams.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Related Exams</p>
                      <div className="flex flex-wrap gap-2">
                        {blog.related_exams.slice(0, 2).map((exam, index) => (
                          <span key={`${exam}-${index}`} className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-md">
                            {exam}
                          </span>
                        ))}
                        {blog.related_exams.length > 2 && (
                          <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-md">
                            +{blog.related_exams.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto">
                    <Link href={`/blogs/${blog.slug}`}>
                      <Button className="w-full h-14 bg-slate-900 hover:bg-green-600 text-white font-black rounded-2xl transition-all duration-300 group/btn flex items-center justify-center gap-2">
                        Read Full Article
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {filteredBlogs.length > itemsPerPage && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Articles per page:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                setItemsPerPage(Number(value))
                setCurrentPage(1)
              }}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="18">18</SelectItem>
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

        {/* Educational Resources Section */}
        <div className="bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Educational <span className="text-green-600">Resources</span> & Guides
              </h2>
              <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Explore our comprehensive collection of educational resources designed to help you navigate your study abroad journey.
                From expert advice on university applications to visa requirements and scholarship opportunities,
                our articles provide actionable insights for international students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Study Abroad Tips</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Discover essential tips for choosing the right country, university, and course.
                  Learn about cultural adaptation, accommodation options, and part-time work opportunities
                  for international students. Our expert consultants share proven strategies for academic success
                  and personal growth in foreign educational environments.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Country selection guidance and comparison</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Application timeline and requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Cultural adaptation strategies</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Exam Preparation</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Master standardized tests required for international admissions. Get comprehensive guides
                  for IELTS, TOEFL, SAT, GRE, GMAT, and other essential exams.
                  Our articles include study schedules, practice strategies, and test-taking techniques
                  from successful candidates.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Comprehensive exam guides and syllabus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Practice tests and time management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Score improvement strategies</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Success Stories</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Get inspired by real experiences from students who successfully studied abroad.
                  Learn from their challenges, achievements, and valuable lessons. These stories provide
                  practical insights and motivation for your own educational journey abroad.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Real student experiences and testimonials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Career outcomes and opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Lessons learned and advice</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-linear-to-r from-green-50 to-blue-50 rounded-3xl p-8 text-center border border-green-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Need Personalized Guidance?
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto mb-6 leading-relaxed">
                Our expert education consultants are here to help you navigate every step of your study abroad journey.
                From university selection to visa applications and pre-departure preparation, we provide personalized
                support tailored to your academic goals and career aspirations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/contact'}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl"
                >
                  Schedule Free Consultation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/about'}
                  className="border-green-600 text-green-600 hover:bg-green-50 font-bold px-8 py-4 rounded-2xl"
                >
                  Learn About Our Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
