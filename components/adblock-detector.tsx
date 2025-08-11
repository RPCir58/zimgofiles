"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

export default function AdblockDetector() {
  const [showModal, setShowModal] = useState(false)
  const [adblockDetected, setAdblockDetected] = useState(false)
  const pathname = usePathname()

  // Don't show on dev pages
  const isDevPage = pathname.startsWith("/dev")

  useEffect(() => {
    if (isDevPage) return

    const detectAdblock = () => {
      // Create a test element that adblock would typically hide
      const testAd = document.createElement("div")
      testAd.innerHTML = "&nbsp;"
      testAd.className = "adsbox"
      testAd.style.position = "absolute"
      testAd.style.left = "-10000px"
      testAd.style.width = "1px"
      testAd.style.height = "1px"

      document.body.appendChild(testAd)

      // Check if the element is hidden (indicating adblock)
      setTimeout(() => {
        const isBlocked =
          testAd.offsetHeight === 0 ||
          window.getComputedStyle(testAd).display === "none" ||
          window.getComputedStyle(testAd).visibility === "hidden"

        document.body.removeChild(testAd)

        if (isBlocked) {
          setAdblockDetected(true)
          setShowModal(true)
        }
      }, 100)
    }

    // Alternative detection method using a fake ad request
    const detectAdblockAlt = () => {
      const script = document.createElement("script")
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      script.onerror = () => {
        setAdblockDetected(true)
        setShowModal(true)
      }
      script.onload = () => {
        // If script loads, no adblock detected
        setAdblockDetected(false)
      }

      document.head.appendChild(script)

      // Clean up
      setTimeout(() => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }, 3000)
    }

    // Run both detection methods
    detectAdblock()
    detectAdblockAlt()
  }, [isDevPage, pathname])

  useEffect(() => {
    if (adblockDetected && !isDevPage) {
      setShowModal(true)
    }
  }, [pathname, adblockDetected, isDevPage])

  const handleClose = () => {
    setShowModal(false)
  }

  if (!showModal || isDevPage) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg z-10"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        {/* Modal content */}
        <div className="p-6 text-center">
          <img
            src="/images/pepetriste.png"
            alt="Pepe está triste porque usas Adblock"
            className="mx-auto max-w-full h-auto"
          />

          {/* Additional text for better accessibility */}
          <div className="mt-4 text-gray-600 text-sm">
            <p>Para apoyar a ZIMGo, considera desactivar tu bloqueador de anuncios.</p>
            <p className="mt-2">¡Gracias por tu comprensión! ❤️</p>
          </div>
        </div>
      </div>
    </div>
  )
}
