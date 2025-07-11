
'use client'

import { useState, useEffect } from 'react'
import { BlogPost, BlogCategory, BlogTag, PaginatedResponse } from '@/lib/types'
import { BlogCard } from '@/components/blog/blog-card'
import { BlogSearch } from '@/components/blog/blog-search'
import { NewsletterSignup } from '@/components/newsletter/newsletter-signup'
import { SocialFeed } from '@/components/social/social-feed'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, TrendingUp, Users, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function KenniscentrumPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [tags, setTags] = useState<BlogTag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0
  })
  const [searchParams, setSearchParams] = useState<{
    query?: string
    category?: string
    tag?: string
  }>({})

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [searchParams, pagination.page])

  const fetchData = async () => {
    try {
      const [categoriesRes, tagsRes] = await Promise.all([
        fetch('/api/blog/categories'),
        fetch('/api/blog/tags')
      ])
      
      const [categoriesData, tagsData] = await Promise.all([
        categoriesRes.json(),
        tagsRes.json()
      ])
      
      if (categoriesData.success) setCategories(categoriesData.data)
      if (tagsData.success) setTags(tagsData.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchParams.query && { query: searchParams.query }),
        ...(searchParams.category && { category: searchParams.category }),
        ...(searchParams.tag && { tag: searchParams.tag })
      })
      
      const response = await fetch(`/api/blog/posts?${params}`)
      const result: PaginatedResponse<BlogPost> = await response.json()
      
      if (result.data) {
        setPosts(result.data)
        setPagination(prev => ({ ...prev, ...result.pagination }))
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (newSearchParams: typeof searchParams) => {
    setSearchParams(newSearchParams)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  const featuredPosts = posts.slice(0, 3)
  const regularPosts = posts.slice(3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              IT Kenniscentrum
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Praktische inzichten, trends en expertise voor IT professionals 
              en business leaders
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-200" />
                <div className="text-left">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-blue-200">Artikelen</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-200" />
                <div className="text-left">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-blue-200">Lezers</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-200" />
                <div className="text-left">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-blue-200">Subscribers</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Search */}
          <BlogSearch
            categories={categories}
            tags={tags}
            onSearch={handleSearch}
            isLoading={isLoading}
          />

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                Uitgelichte Artikelen
              </motion.h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    index={index}
                    showSocial={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          {regularPosts.length > 0 && (
            <div className="mb-16">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                Alle Artikelen
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    index={index + 3}
                    showSocial={false}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mb-16">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === pagination.page ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                  disabled={isLoading}
                >
                  {page}
                </Button>
              ))}
            </div>
          )}

          {/* No Posts Message */}
          {posts.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Geen artikelen gevonden
              </h3>
              <p className="text-gray-600 mb-8">
                Pas je zoekfilters aan om meer resultaten te zien
              </p>
              <Button onClick={() => handleSearch({})}>
                Toon alle artikelen
              </Button>
            </motion.div>
          )}

          {/* Sidebar Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Newsletter Signup */}
            <div className="lg:col-span-1">
              <NewsletterSignup
                source="kenniscentrum"
                showPreferences={false}
                className="mb-8"
              />
            </div>

            {/* Categories */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Categorieën
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleSearch({ category: category.slug })}
                        className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.posts?.length || 0}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Feed */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <CardContent className="p-6">
                  <SocialFeed limit={3} showHeader={true} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
