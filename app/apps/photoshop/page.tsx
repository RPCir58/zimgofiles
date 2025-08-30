"use client"

import { useState, useEffect } from "react"

export default function MinecraftPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-hidden bg-gray-900">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mb-4"></div>
            <p className="text-white text-lg">Cargando Photoshop...</p>
          </div>
        </div>
      )}

      <object
        data="https://www.photopea.com/?p=%7B%22files%22:%5B%22https://zimgo.vercel.app/images/blanco.png%22,%22https://zimgo.vercel.app/images/blanco.png%22%5D,%22environment%22:%7B%7D%7D"
        type="text/html"
        className="w-full h-full"
        title="Brawl Stars"
      >
        <embed
          src="https://www.photopea.com/?p=%7B%22files%22:%5B%22https://zimgo.vercel.app/images/blanco.png%22,%22https://zimgo.vercel.app/images/blanco.png%22%5D,%22environment%22:%7B%7D%7D"
          type="text/html"
          className="w-full h-full"
          title="Brawl Stars"
        />
      </object>
    </div>
  )
}
