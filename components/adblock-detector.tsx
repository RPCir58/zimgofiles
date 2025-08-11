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

    const detectAdblock = async () => {
      let detected = false

      const testElements = [
        { class: "adsbox", id: "ads" },
        { class: "ad-banner", id: "advertisement" },
        { class: "google-ad", id: "google_ads" },
        { class: "adsbygoogle", id: "adsense" },
      ]

      for (const element of testElements) {
        const testDiv = document.createElement("div")
        testDiv.className = element.class
        testDiv.id = element.id
        testDiv.innerHTML = "&nbsp;"
        testDiv.style.position = "absolute"
        testDiv.style.left = "-10000px"
        testDiv.style.width = "1px"
        testDiv.style.height = "1px"

        document.body.appendChild(testDiv)

        // Wait a bit for adblockers to act
        await new Promise((resolve) => setTimeout(resolve, 200))

        const isBlocked =
          testDiv.offsetHeight === 0 ||
          testDiv.offsetWidth === 0 ||
          window.getComputedStyle(testDiv).display === "none" ||
          window.getComputedStyle(testDiv).visibility === "hidden"

        document.body.removeChild(testDiv)

        if (isBlocked) {
          detected = true
          break
        }
      }

      if (!detected) {
        const adblockTests = [
          () => typeof window.uBlock !== "undefined",
          () => typeof window.AdBlock !== "undefined",
          () => typeof window.adblockDetector !== "undefined",
          () => document.querySelector('[id*="adblock"]') !== null,
          () => document.querySelector('[class*="adblock"]') !== null,
        ]

        detected = adblockTests.some((test) => {
          try {
            return test()
          } catch {
            return false
          }
        })
      }

      if (!detected) {
        const adScripts = [
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
          "https://www.googletagservices.com/tag/js/gpt.js",
          "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
        ]

        for (const scriptSrc of adScripts) {
          try {
            await new Promise((resolve, reject) => {
              const script = document.createElement("script")
              script.src = scriptSrc
              script.onload = resolve
              script.onerror = reject

              document.head.appendChild(script)

              // Clean up after test
              setTimeout(() => {
                if (document.head.contains(script)) {
                  document.head.removeChild(script)
                }
              }, 1000)
            })
          } catch {
            detected = true
            break
          }
        }
      }

      if (detected) {
        setAdblockDetected(true)
        setShowModal(true)
      }
    }

    if (document.readyState === "complete") {
      detectAdblock()
    } else {
      window.addEventListener("load", detectAdblock)
      return () => window.removeEventListener("load", detectAdblock)
    }
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
            <p>Haz caso a Pepe, el sí que es buena persona &gt;:(</p>
            <p className="mt-2">Gracias por usar ZIMGo &lt;3</p>
          </div>
        </div>
      </div>
    </div>
  )
}
