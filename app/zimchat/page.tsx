"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function ZimChatPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set a timeout to hide the loading screen after a few seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
          <Loader2 className="h-12 w-12 text-green-500 animate-spin mb-4" />
          <p className="text-lg text-gray-700">Cargando ZimChat...</p>
        </div>
      )}

      <object
        data="https://chat.chateagratis.net/#nick=ZIMGo_User&channel=#zimchat-0"
        type="text/html"
        className="w-full h-full"
      >
        <embed
          src="https://chat.chateagratis.net/#nick=ZIMGo_User&channel=#zimchat-0"
          type="text/html"
          className="w-full h-full"
        />
      </object>
    </div>
  )
}
