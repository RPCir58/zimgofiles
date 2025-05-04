"use client"

import { useState, useEffect } from "react"

interface WebViewerProps {
  url: string
  onLoad?: () => void
}

export default function WebViewer({ url, onLoad }: WebViewerProps) {
  const [content, setContent] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return

    const fetchContent = async () => {
      try {
        // Use our proxy API route to fetch the content
        const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`)

        if (!response.ok) {
          throw new Error("Failed to load content")
        }

        const data = await response.text()
        setContent(data)
        if (onLoad) onLoad()
      } catch (err) {
        setError("Error loading content. This might be due to CORS restrictions.")
        console.error(err)
      }
    }

    fetchContent()
  }, [url, onLoad])

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <p className="text-red-500 mb-2">{error}</p>
          <p className="text-sm text-gray-600">
            Try opening the URL directly:{" "}
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {url}
            </a>
          </p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return <div className="w-full h-full overflow-auto" dangerouslySetInnerHTML={{ __html: content }} />
}
