"use client"

import { useState, useEffect } from "react"
import { Globe, RefreshCw, X, Trash2 } from "lucide-react"

export default function UnblockedWebPage() {
  const [url, setUrl] = useState("")
  const [currentUrl, setCurrentUrl] = useState("")
  const [recentSites, setRecentSites] = useState<string[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pageContent, setPageContent] = useState("")

  const popularSites = [
    { name: "YouTube", url: "https://www.youtube.com" },
    { name: "TikTok", url: "https://www.tiktok.com" },
    { name: "Scratch", url: "https://scratch.mit.edu" },
    { name: "Poki", url: "https://poki.com" },
    { name: "Google", url: "https://www.google.com" },
  ]

  const loadUrl = async (inputUrl: string) => {
    let processedUrl = inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`
    setIsLoading(true)
    setCurrentUrl(processedUrl)
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(processedUrl)}`)
      const data = await response.text()
      setPageContent(data)
      if (!recentSites.includes(processedUrl)) {
        setRecentSites([processedUrl, ...recentSites.slice(0, 4)])
      }
    } catch {
      setPageContent("<p>Hubo un error al cargar la página.</p>")
    }
    setIsLoading(false)
  }

  const handleBack = () => setIsFullscreen(false)
  const handleRefresh = () => loadUrl(currentUrl)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loadUrl(url)
  }

  const handleDeleteHistoryItem = (index: number) => {
    setRecentSites(recentSites.filter((_, i) => i !== index))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen])

  return isFullscreen ? (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="bg-gray-100 border-b p-2 flex items-center gap-2">
        <button onClick={handleBack} className="p-1 rounded hover:bg-gray-200">
          <X size={18} />
        </button>
        <button onClick={handleRefresh} className={`p-1 rounded hover:bg-gray-200 ${isLoading ? "animate-spin" : ""}`}>
          <RefreshCw size={18} />
        </button>
        <form onSubmit={handleSubmit} className="flex-1 flex bg-white rounded border px-3 py-1">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 outline-none text-sm"
            placeholder="Enter URL"
          />
          <button type="submit" className="sr-only">Go</button>
        </form>
      </div>
      <div className="bg-gray-50 text-xs text-gray-500 px-3 py-1 border-b truncate">
        {currentUrl}
      </div>
      <div className="relative flex-1">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin" />
            <p className="mt-2 text-sm text-gray-600">Loading...</p>
          </div>
        )}
        <div className="w-full h-full">
          {pageContent && (
            <object data={currentUrl} type="text/html" className="w-full h-full">
              <embed src={currentUrl} type="text/html" className="w-full h-full" />
            </object>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <Globe className="h-12 w-12 text-green-500 mb-4 p-3 rounded-full bg-green-50" />
        <h1 className="text-4xl font-bold mb-6">Unblocked Web</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">Accede a webs restringidas sin salir de ZIMGo.</p>
      </div>
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
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Go</button>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Populares en ZIMGo</h3>
            <ul className="space-y-2">
              {popularSites.map((site) => (
                <li key={site.name}>
                  <button onClick={() => loadUrl(site.url)} className="text-green-500 hover:text-green-600">{site.name}</button>
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
                    <button onClick={() => loadUrl(site)} className="text-green-500 hover:text-green-600 text-sm truncate">{site}</button>
                    <button onClick={() => handleDeleteHistoryItem(index)} className="text-red-500 hover:text-red-600 p-1 ml-2" title="Borrar">
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Los sitios webs que hayas visitado recientemente desde ZIMGo se mostrarán aquí.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
