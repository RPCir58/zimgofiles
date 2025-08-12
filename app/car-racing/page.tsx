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
            <p className="text-white text-lg">Cargando Car Racing...</p>
          </div>
        </div>
      )}

      <object
        data="https://html5.gamedistribution.com/a42cb23aca9647b3840f8a7dca61fde5/?gd_sdk_referrer_url=https%3A%2F%2Fminijuegos.com%2Fjuego%2Fmr-racer"
        type="text/html"
        className="w-full h-full"
        title="Car Racing"
      >
        <embed
          src="https://html5.gamedistribution.com/a42cb23aca9647b3840f8a7dca61fde5/?gd_sdk_referrer_url=https%3A%2F%2Fminijuegos.com%2Fjuego%2Fmr-racer"
          type="text/html"
          className="w-full h-full"
          title="Car Racing"
        />
      </object>
    </div>
  )
}
