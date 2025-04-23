"use client"

import { useEffect, useRef } from "react"

export default function MinecraftPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Load the HTML content into the iframe
    if (iframeRef.current) {
      const iframe = iframeRef.current
      if (iframe) {
        const doc = iframe.contentDocument || iframe.contentWindow?.document
        if (doc) {
          doc.open()
          // Instead of fetching, we'll directly navigate to the HTML file
          iframe.src = "/zimgo-minecraft/page.html"
          doc.close()

          // Make iframe fullscreen
          iframe.style.width = "100%"
          iframe.style.height = "100vh"
          iframe.style.border = "none"
        }
      }
    }
  }, [])

  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        ref={iframeRef}
        title="Minecraft 1.5.2"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}
