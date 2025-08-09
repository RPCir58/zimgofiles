"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat, Music, X } from "lucide-react"

interface Song {
  id: string
  title: string
  artist: string
  thumbnail: string
  channel: string
  publishedAt: string
  description?: string
}

interface PlayerState {
  currentSong: Song | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
}

export default function ZimMusicPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [songs, setSongs] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
  })
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPlayer, setShowPlayer] = useState(false)

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const popularSearches = [
    "Reggaeton 2024",
    "Pop en español",
    "Rock clásico",
    "Música electrónica",
    "Hip hop",
    "Música relajante",
    "Éxitos del momento",
    "Música indie",
  ]

  useEffect(() => {
    const saved = localStorage.getItem("zimmusic_recent_searches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  const handleSearch = async (query: string = searchQuery) => {
    if (!query.trim()) return

    setIsLoading(true)
    setSearchPerformed(true)

    const newRecentSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
    setRecentSearches(newRecentSearches)
    localStorage.setItem("zimmusic_recent_searches", JSON.stringify(newRecentSearches))

    try {
      const encodedQuery = encodeURIComponent(query)
      const response = await fetch("/api/youtube/music?q=" + encodedQuery + "&maxResults=20")
      const data = await response.json()

      if (data.songs) {
        setSongs(data.songs)
        setPlaylist(data.songs)
      } else {
        setSongs([])
        setPlaylist([])
      }
    } catch (error) {
      console.error("Search error:", error)
      setSongs([])
      setPlaylist([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSongSelect = (song: Song, index: number) => {
    setPlayerState((prev) => ({
      ...prev,
      currentSong: song,
      isPlaying: true,
    }))
    setCurrentIndex(index)
    setShowPlayer(true)
  }

  const togglePlayPause = () => {
    setPlayerState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }))
  }

  const playNext = () => {
    if (currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setPlayerState((prev) => ({
        ...prev,
        currentSong: playlist[nextIndex],
        isPlaying: true,
      }))
    }
  }

  const playPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      setPlayerState((prev) => ({
        ...prev,
        currentSong: playlist[prevIndex],
        isPlaying: true,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("zimmusic_recent_searches")
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setPlayerState((prev) => ({ ...prev, volume: newVolume }))
  }

  if (showPlayer && playerState.currentSong) {
    const autoplayValue = playerState.isPlaying ? 1 : 0
    const embedUrl =
      "https://www.youtube.com/embed/" +
      playerState.currentSong.id +
      "?autoplay=" +
      autoplayValue +
      "&controls=0&showinfo=0&rel=0&modestbranding=1"

    return (
      <div className="w-full h-[calc(100vh-64px)] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
        <div className="bg-black bg-opacity-30 p-4 flex items-center justify-between">
          <button
            onClick={() => setShowPlayer(false)}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <X size={20} />
            <span>Volver a búsqueda</span>
          </button>
          <div className="text-white text-sm">ZimMusic</div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="mb-6">
            <img
              src={playerState.currentSong.thumbnail || "/placeholder.svg"}
              alt={playerState.currentSong.title}
              className="w-64 h-64 rounded-lg shadow-2xl object-cover"
            />
          </div>

          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-white mb-1 max-w-md truncate">{playerState.currentSong.title}</h1>
            <p className="text-lg text-gray-300 max-w-md truncate">{playerState.currentSong.artist}</p>
          </div>

          <div className="flex items-center gap-3 text-white mb-6">
            <Volume2 size={18} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={playerState.volume}
              onChange={handleVolumeChange}
              className="w-32 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm w-8">{Math.round(playerState.volume * 100)}</span>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <button className="text-white hover:text-purple-300 transition-colors">
              <Shuffle size={22} />
            </button>
            <button
              onClick={playPrevious}
              disabled={currentIndex === 0}
              className="text-white hover:text-purple-300 transition-colors disabled:opacity-50"
            >
              <SkipBack size={28} />
            </button>
            <button
              onClick={togglePlayPause}
              className="bg-white text-purple-900 rounded-full p-3 hover:bg-gray-200 transition-colors shadow-lg"
            >
              {playerState.isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </button>
            <button
              onClick={playNext}
              disabled={currentIndex === playlist.length - 1}
              className="text-white hover:text-purple-300 transition-colors disabled:opacity-50"
            >
              <SkipForward size={28} />
            </button>
            <button className="text-white hover:text-purple-300 transition-colors">
              <Repeat size={22} />
            </button>
          </div>

          <div className="text-center text-gray-300 text-sm">
            <p>
              Pista {currentIndex + 1} de {playlist.length}
            </p>
          </div>
        </div>

        <div className="absolute -top-full -left-full w-1 h-1 overflow-hidden">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={playerState.currentSong.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <div className="mb-4 p-3 rounded-full bg-purple-50">
          <Music className="h-12 w-12 text-purple-500" />
        </div>
        <h1 className="text-4xl font-bold mb-6">ZimMusic</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          Escucha música de YouTube Music directamente desde ZIMGo.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Buscar Música</h2>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar canciones, artistas, álbumes..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Search size={20} />
              )}
              Buscar
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Géneros populares</h3>
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
                  <button onClick={clearRecentSearches} className="text-sm text-purple-500 hover:text-purple-600">
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
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm hover:bg-purple-100 transition-colors"
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

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Buscando música...</p>
          </div>
        </div>
      )}

      {songs.length > 0 && !isLoading && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">
            Resultados {searchQuery && 'para "' + searchQuery + '"'} ({songs.length} canciones)
          </h2>
          <div className="space-y-2">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4"
                onClick={() => handleSongSelect(song, index)}
              >
                <div className="relative">
                  <img
                    src={song.thumbnail || "/placeholder.svg"}
                    alt={song.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
                    <Play className="text-white" size={24} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{song.title}</h3>
                  <p className="text-gray-600 mb-1">{song.artist}</p>
                  <p className="text-gray-400 text-sm">{song.publishedAt}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="text-purple-500 hover:text-purple-600 transition-colors">
                    <Play size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {songs.length === 0 && !isLoading && searchPerformed && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Music size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontró música</h3>
          <p className="text-gray-500">Intenta con otros términos de búsqueda</p>
        </div>
      )}

      {!searchPerformed && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Music size={64} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">¡Descubre nueva música!</h3>
          <p className="text-gray-500">Busca tus canciones, artistas y álbumes favoritos</p>
        </div>
      )}
    </div>
  )
}
