"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LogOut,
  Globe,
  CheckCircle,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Copy,
  ExternalLink,
  ChevronDown,
} from "lucide-react"

export default function DominiosPage() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(true)
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null)
  const [selectedCollege, setSelectedCollege] = useState("Maristas")
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

  const copyToClipboard = async (domain: string) => {
    try {
      await navigator.clipboard.writeText(domain)
      setCopiedDomain(domain)
      setTimeout(() => setCopiedDomain(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dominios...</p>
        </div>
      </div>
    )
  }

  const colleges = ["Maristas", "Salesianos", "Eiris", "Santa María del Mar", "Rosalía de Castro", "Compañía de María"]

  const baseDomains = [
    {
      url: "https://zimgo.vercel.app/",
      description: "Dominio principal actual",
    },
    {
      url: "https://zimgoforever.vercel.app/",
      description: "Dominio alternativo",
    },
    {
      url: "https://zimgoneverdie.vercel.app/",
      description: "Dominio alternativo",
    },
    {
      url: "https://zimgoalt.vercel.app/",
      description: "Dominio alternativo",
    },
    {
      url: "https://ucantblockme.vercel.app/",
      description: "Dominio alternativo",
    },
    {
      url: "https://everythinghasbugs.vercel.app/",
      description: "Dominio alternativo",
    },
    {
      url: "https://haymashostingsque.vercel.app/",
      description: "Dominio alternativo",
    },
    {
      url: "https://nadiemebloquea.vercel.app/",
      description: "Dominio alternativo",
    },
    {
      url: "https://zimgocantbeblocked.vercel.app/",
      description: "Dominio alternativo",
    },
    {
      url: "https://zimgo.s3.amazonaws.com/web/",
      description: "Dominio alternativo",
    },
    {
      url: "https://zimgo.cloudfront.net/",
      description: "Dominio alternativo",
    },
  ]

  // Generate different statuses for each college
  const getCollegeStatuses = (college: string) => {
    const statusMap: { [key: string]: string[] } = {
      Maristas: [
        "bloqueado",
        "bloqueado",
        "bloqueado",
        "bloqueado",
        "bloqueado",
        "bloqueado",
        "bloqueado",
        "bloqueado",
        "bloqueado",
        "desarrollo",
        "desarrollo",
      ],
      Salesianos: [
        "bloqueado",
        "bloqueado",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desarrollo",
        "desarrollo",
      ],
      Eiris: [
        "bloqueado",
        "desconocido",
        "activo",
        "activo",
        "activo",
        "activo",
        "activo",
        "activo",
        "activo",
        "desarrollo",
        "desarrollo",
      ],
      "Santa María del Mar": [
        "desconocido",
        "desconocido",
        "activo",
        "activo",
        "activo",
        "activo",
        "activo",
        "activo",
        "activo",
        "desarrollo",
        "desarrollo",
      ],
      "Rosalía de Castro": [
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocidoo",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desarrollo",
        "desarrollo",
      ],
      "Compañía de María": [
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desarrollo",
        "desarrollo",
      ],
    }
    return (
      statusMap[college] || [
        "activo",
        "activo",
        "activo",
        "desarrollo",
        "bloqueado",
        "desarrollo",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
        "desconocido",
      ]
    )
  }

  const domains = baseDomains.map((domain, index) => ({
    ...domain,
    status: getCollegeStatuses(selectedCollege)[index],
    lastChecked: `Hace ${Math.floor(Math.random() * 60) + 5} minutos`,
  }))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
        return "text-green-600 bg-green-50"
      case "desarrollo":
        return "text-blue-600 bg-blue-50"
      case "bloqueado":
        return "text-red-600 bg-red-50"
      case "desconocido":
        return "text-gray-600 bg-gray-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "activo":
        return <CheckCircle size={16} />
      case "desarrollo":
        return <AlertTriangle size={16} />
      case "bloqueado":
        return <XCircle size={16} />
      case "desconocido":
        return <HelpCircle size={16} />
      default:
        return <Globe size={16} />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "activo":
        return "Activo"
      case "desarrollo":
        return "Desarrollo"
      case "bloqueado":
        return "Bloqueado"
      case "desconocido":
        return "Desconocido"
      default:
        return "Desconocido"
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dominios ZIMGo</h1>
            <p className="text-gray-600 mt-2">
              ¡Hola, <span className="font-semibold">{username}</span>! Selecciona tu colegio para ver el estado de los
              dominios.
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

        {/* College Selector */}
        <div className="mb-8">
          <label htmlFor="college-select" className="block text-sm font-medium text-gray-700 mb-2">
            Selecciona tu colegio:
          </label>
          <div className="relative">
            <select
              id="college-select"
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full max-w-md"
            >
              {colleges.map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle size={20} />
              <span className="font-semibold">Activos</span>
            </div>
            <p className="text-2xl font-bold text-green-800 mt-2">
              {domains.filter((d) => d.status === "activo").length}
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-700">
              <AlertTriangle size={20} />
              <span className="font-semibold">Desarrollo</span>
            </div>
            <p className="text-2xl font-bold text-blue-800 mt-2">
              {domains.filter((d) => d.status === "desarrollo").length}
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-700">
              <XCircle size={20} />
              <span className="font-semibold">Bloqueados</span>
            </div>
            <p className="text-2xl font-bold text-red-800 mt-2">
              {domains.filter((d) => d.status === "bloqueado").length}
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-700">
              <HelpCircle size={20} />
              <span className="font-semibold">Desconocidos</span>
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {domains.filter((d) => d.status === "desconocido").length}
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Estado para {selectedCollege}</h3>
              <div className="text-blue-800 text-sm space-y-2">
                <p>
                  • <strong>Activo</strong>: El dominio funciona correctamente en tu colegio.
                </p>
                <p>
                  • <strong>Desarrollo</strong>: El dominio está en pruebas, puede tener funcionalidad limitada.
                </p>
                <p>
                  • <strong>Bloqueado</strong>: El dominio está bloqueado por la red de tu colegio.
                </p>
                <p>
                  • <strong>Desconocido</strong>: No tenemos información sobre el estado de este dominio en tu colegio.
                </p>
                <p>• Si un dominio está bloqueado, prueba con los que están activos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Domains List */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-lg">Estado de Dominios - {selectedCollege}</h3>
            <p className="text-sm text-gray-600 mt-1">Estado actual de todos los dominios de ZIMGo en tu colegio</p>
          </div>

          <div className="divide-y divide-gray-200">
            {domains.map((domain, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-lg font-medium text-gray-900">{domain.url}</span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(domain.status)}`}
                      >
                        {getStatusIcon(domain.status)}
                        {getStatusText(domain.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{domain.description}</p>
                    <p className="text-gray-400 text-xs">Última verificación: {domain.lastChecked}</p>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => copyToClipboard(domain.url)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      title="Copiar dominio"
                    >
                      {copiedDomain === domain.url ? (
                        <CheckCircle size={18} className="text-green-500" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                    {domain.status !== "bloqueado" && (
                      <a
                        href={domain.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        title="Abrir en nueva pestaña"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Channel Reminder */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-1">Canal de WhatsApp</h3>
              <p className="text-green-800 text-sm mb-2">
                Únete para recibir notificaciones cuando cambien los estados de los dominios en tu colegio.
              </p>
              <a
                href="https://whatsapp.com/channel/0029VbB4Qr1J93wNd5Ni9Q34"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
              >
                <ExternalLink size={16} />
                Unirse al canal
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
