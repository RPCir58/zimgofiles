"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Play, Clock, Eye, X, RefreshCw } from "lucide-react"

interface Video {
  id: string
  title: string
  thumbnail: string
  channel: string
  duration: string
  views: string
  publishedAt: string
}

export default function ZimTubePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Mock video data for demonstration
  const mockVideos: Video[] = [
    {
      id: "dQw4w9WgXcQ",
      title: "Rick Astley - Never Gonna Give You Up (Official Video)",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      channel: "Rick Astley",
      duration: "3:33",
      views: "1.4B",
      publishedAt: "hace 15 años",
    },
    {
      id: "9bZkp7q19f0",
      title: "PSY - GANGNAM STYLE(강남스타일) M/V",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg",
      channel: "officialpsy",
      duration: "4:13",
      views: "4.8B",
      publishedAt: "hace 11 años",
    },
    {
      id: "kJQP7kiw5Fk",
      title: "Luis Fonsi - Despacito ft. Daddy Yankee",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg",
      channel: "LuisFonsiVEVO",
      duration: "4:42",
      views: "8.2B",
      publishedAt: "hace 6 años",
    },
    {
      id: "fJ9rUzIMcZQ",
      title: "Queen – Bohemian Rhapsody (Official Video Remastered)",
      thumbnail: "https://img.youtube.com/vi/fJ9rUzIMcZQ/mqdefault.jpg",
      channel: "Queen Official",
      duration: "5:55",
      views: "1.9B",
      publishedAt: "hace 13 años",
    },
    {
      id: "JGwWNGJdvx8",
      title: "Ed Sheeran - Shape of You (Official Video)",
      thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/mqdefault.jpg",
      channel: "Ed Sheeran",
      duration: "3:54",
      views: "6.1B",
      publishedAt: "hace 7 años",
    },
    {
      id: "YQHsXMglC9A",
      title: "Adele - Hello (Official Music Video)",
      thumbnail: "https://img.youtube.com/vi/YQHsXMglC9A/mqdefault.jpg",
      channel: "AdeleVEVO",
      duration: "6:07",
      views: "3.2B",
      publishedAt: "hace 8 años",
    },
  ]

  const popularSearches = [
    "Música en español",
    "Gaming videos",
    "Tutoriales",
    "Música pop",
    "Minecraft",
    "Funny videos",
  ]

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("zimtube_recent_searches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  const handleSearch = (query: string = searchQuery) => {
    if (!query.trim()) return

    setIsLoading(true)

    // Add to recent searches
    const newRecentSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
    setRecentSearches(newRecentSearches)
    localStorage.setItem("zimtube_recent_searches", JSON.stringify(newRecentSearches))

    // Simulate API call with mock data
    setTimeout(() => {
      const filteredVideos = mockVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(query.toLowerCase()) ||
          video.channel.toLowerCase().includes(query.toLowerCase()),
      )

      if (filteredVideos.length === 0) {
        setVideos(mockVideos) // Show all videos if no matches
      } else {
        setVideos(filteredVideos)
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video)
    setIsVideoLoading(true)

    // Simulate video loading
    setTimeout(() => {
      setIsVideoLoading(false)
    }, 2000)
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
        <div className="flex-1 relative">
          {isVideoLoading && (
            <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
              <div className="flex flex-col items-center text-white">
                <div className="w-12 h-12 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mb-4"></div>
                <p className="text-lg">Cargando video...</p>
              </div>
            </div>
          )}

          <div className="w-full h-full">
            <object
              data={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
              type="text/html"
              className="w-full h-full"
              title={selectedVideo.title}
            >
              <embed
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                type="text/html"
                className="w-full h-full"
                title={selectedVideo.title}
              />
            </object>
          </div>
        </div>

        {/* Video Info */}
        <div className="bg-gray-900 p-4 text-white">
          <h2 className="text-lg font-semibold mb-2">{selectedVideo.title}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span>{selectedVideo.channel}</span>
            <span className="flex items-center gap-1">
              <Eye size={16} />
              {selectedVideo.views} visualizaciones
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {selectedVideo.publishedAt}
            </span>
          </div>
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
          <h2 className="text-2xl font-semibold mb-6">Resultados {searchQuery && `para "${searchQuery}"`}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleVideoSelect(video)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                    <Play className="text-white" size={48} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-tight">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{video.channel}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {video.views}
                    </span>
                    <span>•</span>
                    <span>{video.publishedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {videos.length === 0 && !isLoading && searchQuery && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron videos</h3>
          <p className="text-gray-500">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  )
}
