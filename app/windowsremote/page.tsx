"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Download, Smartphone, Monitor, Shield, Star, CheckCircle } from "lucide-react"

export default function ZimAppPage() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const storedUsername = localStorage.getItem("username")

    if (isAuthenticated !== "true") {
      router.push("/login")
    } else {
      setUsername(storedUsername || "")
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("username")
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando ZIM App...</p>
        </div>
      </div>
    )
  }

  return (
   <div>
     <object
        data="https://app.apponfly.com/trial"
        type="text/html"
        className="w-full h-full"
        title="Windows 11"
      >
        <embed
          src="https://app.apponfly.com/trial"
          type="text/html"
          className="w-full h-full"
          title="Windows 11"
        />
      </object>
    </div>
  }
      
}
