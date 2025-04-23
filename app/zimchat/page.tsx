"use client"

import { useEffect, useRef } from "react"

export default function ZimChatPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Load the HTML content into the iframe
    if (iframeRef.current) {
      const iframe = iframeRef.current
      if (iframe) {
        const doc = iframe.contentDocument || iframe.contentWindow?.document
        if (doc) {
          doc.open()
          // Set the iframe source to the HTML file
          iframe.src = "/app/zimchat/page.html"
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
        title="ZimChat"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}
