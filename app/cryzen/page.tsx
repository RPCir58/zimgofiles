"use client"

import { useState, useEffect } from "react"
import { RefreshCw, X } from "lucide-react"

export default function FullscreenPage() {
  const [url, setUrl] = useState("https://cryzen.io/")
  const [currentUrl, setCurrentUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Cargar la URL a través de un proxy
  const loadUrl = async (inputUrl: string) => {
    const processedUrl = inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`
    setIsLoading(true)
    setCurrentUrl(processedUrl)
    setIsLoading(false)
  }

  // Refrescar la página actual
  const handleRefresh = () => loadUrl(currentUrl)

  // Ir hacia atrás (cerrar fullscreen)
  const handleBack = () => setCurrentUrl("")

  useEffect(() => {
    loadUrl(url) // Cargar la página inicial por defecto
  }, [url])

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar (fija en la parte superior) */}
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <button onClick={handleBack} className="text-white p-2 rounded hover:bg-gray-700">
          <X size={18} />
        </button>
        <button
          onClick={handleRefresh}
          className={`p-2 rounded hover:bg-gray-700 ${isLoading ? "animate-spin" : ""}`}
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Contenido de la página (se carga con el proxy) */}
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-white bg-opacity-80">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
              <p className="mt-2 text-sm text-gray-600">Cargando...</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full overflow-auto">
            <iframe
              src={`https://api.allorigins.win/raw?url=${encodeURIComponent(currentUrl)}`}
              className="w-full h-full"
              title="Web Content"
              frameBorder="0"
            ></iframe>
          </div>
        )}
      </div>

      {/* Footer (fijo en la parte inferior) */}
      <div className="bg-gray-900 text-white p-4 mt-auto">
        <p className="text-center">Footer - Cargado a través de un proxy</p>
      </div>
    </div>
  )
}
