"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogOut, FileText, Download, Shield } from "lucide-react"

export default function RecursosPrivadosPage() {
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
          <p className="mt-4 text-gray-600">Cargando recursos privados...</p>
        </div>
      </div>
    )
  }

  const isAdmin = username === "RP_Circulo"

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Recursos Privados</h1>
            <p className="text-gray-600 mt-2">
              ¡Hola, <span className="font-semibold">{username}</span>!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>

        {isAdmin && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-2 text-yellow-700 font-medium mb-2">
              <Shield className="h-5 w-5" />
              Panel de Administrador
            </div>
            <p className="text-yellow-600 mb-4">Tu cuenta tiene permisos de administración.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-white border border-yellow-300 rounded-md p-3 hover:bg-yellow-50 transition-colors text-left">
                Gestionar usuarios
              </button>
              <button className="bg-white border border-yellow-300 rounded-md p-3 hover:bg-yellow-50 transition-colors text-left">
                Configuración del sistema
              </button>
              <button className="bg-white border border-yellow-300 rounded-md p-3 hover:bg-yellow-50 transition-colors text-left">
                Estadísticas de uso
              </button>
              <button className="bg-white border border-yellow-300 rounded-md p-3 hover:bg-yellow-50 transition-colors text-left">
                Send Email
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-green-50 mr-3">
                <FileText className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-lg">Documentos Exclusivos</h3>
            </div>
            <p className="text-gray-600 mb-4">Accede a documentos y guías exclusivas para usuarios registrados.</p>
            <button className="text-green-500 font-medium hover:text-green-600 transition-colors">
              Ver documentos
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-green-50 mr-3">
                <Download className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-lg">Descarga ZIM App</h3>
            </div>
            <p className="text-gray-600 mb-4">Descarga ZIM App fácilmente desde ZIMGo.</p>
            <button className="text-green-500 font-medium hover:text-green-600 transition-colors"><a href="/zimapp" className="">
              Ver descargas
            </a></button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold">Recursos Disponibles</h3>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">Guía avanzada de ZIMGo</h4>
                <p className="text-sm text-gray-500">PDF - 2.5 MB</p>
              </div>
              <button className="text-green-500 hover:text-green-600">Descargar</button>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">Plantillas premium</h4>
                <p className="text-sm text-gray-500">ZI 15 MB</p>
              </div>P -
              <button className="text-green-500 hover:text-green-600">Descargar</button>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">Acceso a servidores privados</h4>
                <p className="text-sm text-gray-500">Credenciales exclusivas</p>
              </div>
              <button className="text-green-500 hover:text-green-600">Ver detalles</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
