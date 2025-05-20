"use client"

import type React from "react"

import { Globe, RefreshCw, X, Trash2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function UnblockedWebPage() {
  const [url, setUrl] = useState("")
  const [currentUrl, setCurrentUrl] = useState("")
  const [recentSites, setRecentSites] = useState<string[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pageTitle, setPageTitle] = useState("")
  const webViewRef = useRef<HTMLDivElement>(null)

  const popularSites = [
    { name: "Bad Time Simulator", url: "https://badtimesimulator.io/" },
    { name: "Google Maps", url: "https://google.com/es/maps/" },
    { name: "Google Drive", url: "https://drive.google.com/" },
    { name: "Google Earth", url: "https://earth.google.com/" },
    { name: "Google", url: "https://www.google.com" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loadUrl(url)
  }

  const loadUrl = (inputUrl: string) => {
    // Add https:// if not present
    let processedUrl = inputUrl
    if (!/^https?:\/\//i.test(inputUrl)) {
      processedUrl = `https://${inputUrl}`
    }

    setIsLoading(true)
    setCurrentUrl(processedUrl)
    setIsFullscreen(true)

    // Add to recent sites if not already there
    if (!recentSites.includes(processedUrl)) {
      setRecentSites((prev) => [processedUrl, ...prev].slice(0, 5))
    }
  }

  const loadSite = (siteUrl: string) => {
    setUrl(siteUrl)
    loadUrl(siteUrl)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Re-load the current URL
    const tempUrl = currentUrl
    setCurrentUrl("")
    setTimeout(() => {
      setCurrentUrl(tempUrl)
    }, 100)
  }

  const handleBack = () => {
    setIsFullscreen(false)
  }

  const handleDeleteHistoryItem = (index: number) => {
    setRecentSites((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen])

  // Handle loading state
  useEffect(() => {
    if (currentUrl) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentUrl])

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Browser-like header */}
        <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center gap-2">
          <button onClick={handleBack} className="p-1 rounded hover:bg-gray-200" aria-label="Back to search">
            <X size={18} />
          </button>

          <button
            onClick={handleRefresh}
            className={`p-1 rounded hover:bg-gray-200 ${isLoading ? "animate-spin" : ""}`}
            aria-label="Refresh page"
          >
            <RefreshCw size={18} />
          </button>

          <div className="flex-1 flex bg-white rounded border border-gray-300 px-3 py-1">
            <form onSubmit={handleSubmit} className="flex-1 flex">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 outline-none text-sm"
                placeholder="Enter URL"
              />
              <button type="submit" className="sr-only">
                Go
              </button>
            </form>
          </div>
        </div>

        {/* Page title */}
        <div className="bg-gray-50 text-xs text-gray-500 px-3 py-1 border-b border-gray-200 truncate">
          {pageTitle || currentUrl}
        </div>

        {/* Web content area */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
                <p className="mt-2 text-sm text-gray-600">Cargando...</p>
              </div>
            </div>
          )}

          <div ref={webViewRef} className="w-full h-full">
            {/* Web content is loaded here */}
            <div className="w-full h-full flex items-center justify-center">
              {currentUrl ? (
                <object data={currentUrl} type="text/html" className="w-full h-full">
                  <embed src={currentUrl} type="text/html" className="w-full h-full" />
                </object>
              ) : (
                <p>No URL cargada</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <div className="mb-4 p-3 rounded-full bg-green-50">
          <Globe className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold mb-6">Unblocked Web</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">Accede a webs restringidas sin salir de ZIMGo.</p>
      </div>
      <p className="text-gray-500 text-sm mb-8">Función en desarrollo, muchas webs no funcionan.</p>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Visitar Sitio Web</h2>
          <p className="text-gray-600 mb-6">Escribe la URL del sitio web al que quieres acceder abajo:</p>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://zimgo.vercel.app/"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Go
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Sitios de juegos recomendados</h3>
            <ul className="space-y-2">
              {popularSites.map((site) => (
                <li key={site.name}>
                  <button
                    onClick={() => loadSite(site.url)}
                    className="text-green-500 hover:text-green-600 transition-colors"
                  >
                    {site.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Visitado recientemente</h3>
            {recentSites.length > 0 ? (
              <ul className="space-y-2">
                {recentSites.map((site, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <button
                      onClick={() => loadSite(site)}
                      className="text-green-500 hover:text-green-600 transition-colors text-sm truncate flex-1 text-left"
                    >
                      {site}
                    </button>
                    <button
                      onClick={() => handleDeleteHistoryItem(index)}
                      className="text-red-500 hover:text-red-600 transition-colors p-1 ml-2"
                      aria-label="Borrar de historial"
                      title="Borrar"
                    >
                      <Trash2 size={16} />
                      <span className="sr-only">Borrar</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                Los sitios webs que hayas visitado recientemente desde ZIMGo se mostrarán aquí.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
