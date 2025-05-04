"use client"

import { useEffect, useRef } from "react"

export default function CryzenPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Make iframe fullscreen
    if (iframeRef.current) {
      const iframe = iframeRef.current
      iframe.style.width = "100%"
      iframe.style.height = "calc(100vh - 64px)" // Adjust for navbar height
      iframe.style.border = "none"
    }
  }, [])

  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-hidden">
      <iframe
        ref={iframeRef}
        src="https://classicube.net/server/play?warned=true"
        title="Minecraft Classic Mobile"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  )
}
