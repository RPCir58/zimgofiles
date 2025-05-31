"use client"

import { useState, useEffect } from "react"

export default function KoFiPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-lg mb-6">Dónanos en Ko-fi para que podamos mantener ZIMGo en pie. 💚</p>

        <div className="w-full h-[calc(100vh-200px)] overflow-hidden bg-white rounded-lg shadow-lg">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-500 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mb-4"></div>
                <p className="text-white text-lg">Cargando...</p>
              </div>
            </div>
          )}

          <object data="https://ko-fi.com/rp_circulo" type="text/html" className="w-full h-full" title="Ko-fi">
            <embed src="https://ko-fi.com/rp_circulo" type="text/html" className="w-full h-full" title="Ko-fi" />
          </object>
        </div>
      </div>
    </div>
  )
}
