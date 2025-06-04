"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Play, Eye, X, RefreshCw, ThumbsUp, Calendar } from "lucide-react"

interface Video {
  id: string
  title: string
  thumbnail: string
  channel: string
  publishedAt: string
  description?: string
}

interface VideoDetails {
  id: string
  title: string
  channel: string
  description: string
  publishedAt: string
  views: string
  likes: string
  duration: string
  thumbnail: string
}

export default function ZimTubePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<VideoDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [searchPerformed, setSearchPerformed] = useState(false)

  const popularSearches = [
    "Música en español",
    "Gaming videos",
    "Tutoriales",
    "Música pop",
    "Minecraft",
    "Funny videos",
    "Noticias",
    "Deportes",
  ]

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("zimtube_recent_searches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  const handleSearch = async (query: string = searchQuery) => {
    if (!query.trim()) return

    setIsLoading(true)
    setSearchPerformed(true)

    // Add to recent searches
    const newRecentSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
    setRecentSearches(newRecentSearches)
    localStorage.setItem("zimtube_recent_searches", JSON.stringify(newRecentSearches))

    try {
      const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}&maxResults=12`)
      const data = await response.json()

      if (data.videos) {
        setVideos(data.videos)
      } else {
        setVideos([])
      }
    } catch (error) {
      console.error("Search error:", error)
      setVideos([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleVideoSelect = async (video: Video) => {
    setIsVideoLoading(true)

    try {
      const response = await fetch(`/api/youtube/video?id=${video.id}`)
      const videoDetails = await response.json()

      setSelectedVideo(videoDetails)
    } catch (error) {
      console.error("Video details error:", error)
      // Fallback to basic video info
      setSelectedVideo({
        id: video.id,
        title: video.title,
        channel: video.channel,
        description: video.description || "",
        publishedAt: video.publishedAt,
        views: "N/A",
        likes: "N/A",
        duration: "N/A",
        thumbnail: video.thumbnail,
      })
    } finally {
      setIsVideoLoading(false)
    }
  }

  const handleBackToSearch = () => {
    setSelectedVideo(null)
    setIsVideoLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("zimtube_recent_searches")
  }

  if (selectedVideo) {
    return (
      <div className="w-full h-[calc(100vh-64px)] bg-black flex flex-col">
        {/* Video Player Header */}
        <div className="bg-gray-900 p-4 flex items-center justify-between">
          <button
            onClick={handleBackToSearch}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <X size={20} />
            <span>Volver a búsqueda</span>
          </button>
          <div className="text-white text-sm">ZimTube</div>
        </div>

        {/* Video Player */}
        <div className="flex-1 relative bg-black">
          {isVideoLoading && (
            <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
              <div className="flex flex-col items-center text-white">
                <div className="w-12 h-12 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mb-4"></div>
                <p className="text-lg">Cargando video...</p>
              </div>
            </div>
          )}

          <div className="w-full h-full flex items-center justify-center">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&showinfo=0&modestbranding=1&fs=1`}
              title={selectedVideo.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>

        {/* Video Info */}
        <div className="bg-gray-900 p-6 text-white max-h-[30%] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-3">{selectedVideo.title}</h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
            <span className="font-medium">{selectedVideo.channel}</span>
            <span className="flex items-center gap-1">
              <Eye size={16} />
              {selectedVideo.views} visualizaciones
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp size={16} />
              {selectedVideo.likes}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {selectedVideo.publishedAt}
            </span>
          </div>
          {selectedVideo.description && (
            <div className="text-sm text-gray-300">
              <p className="line-clamp-3">{selectedVideo.description}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <div className="mb-4 p-3 rounded-full bg-red-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-6">ZimTube</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          Busca y reproduce videos de YouTube directamente desde ZIMGo.
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Buscar Videos</h2>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar videos en YouTube..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <Search size={20} />}
              Buscar
            </button>
          </form>

          {/* Popular and Recent Searches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Búsquedas populares</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(search)
                      handleSearch(search)
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Búsquedas recientes</h3>
                  <button onClick={clearRecentSearches} className="text-sm text-red-500 hover:text-red-600">
                    Limpiar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(search)
                        handleSearch(search)
                      }}
                      className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm hover:bg-red-100 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Buscando videos...</p>
          </div>
        </div>
      )}

      {/* Video Results */}
      {videos.length > 0 && !isLoading && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">
            Resultados {searchQuery && `para "${searchQuery}"`} ({videos.length} videos)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleVideoSelect(video)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=180&width=320"
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                    <Play className="text-white" size={48} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-tight">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{video.channel}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {video.publishedAt}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {videos.length === 0 && !isLoading && searchPerformed && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron videos</h3>
          <p className="text-gray-500">Intenta con otros términos de búsqueda</p>
        </div>
      )}

      {/* Initial State */}
      {!searchPerformed && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto"
            >
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">¡Busca cualquier video de YouTube!</h3>
          <p className="text-gray-500">Usa la barra de búsqueda para encontrar videos, música, tutoriales y más</p>
        </div>
      )}
    </div>
  )
}
