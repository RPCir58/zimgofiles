"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, User } from "lucide-react"

// Hardcoded credentials
const validCredentials = [
  { username: "RP_Circulo", password: "Pass19243" },
  { username: "frsnt", password: "frsnt_41" },
  { username: "RoRo", password: "RodrigoHerrero583" },
  { username: "palmerapalmero", password: "Pepinos47" },
  { username: "mayonesa", password: "(2Sopa_De_Cebolla2)" },
  { username: "Mouzo_Maristas", password: "MouzoViq" },
  { username: "MEMEWORLD", password: "perropianoarbol." },
  { username: "Mario", password: "Orillamar15" },
  { username: "SoyDieguito72YT", password: "Arrozconhuevo72" },
  { username: "pepe", password: "holamundo" },
  { username: "Alvaro22", password: "Alvaro2402" },
  { username: "Blanco.Alessandro", password: "meigoynala"},
  { username: "loose", password: "Anton030909"},
  { username: "mateogonzalez", password: "Password18064"},
  { username: "YeraymCuesta", password: "Yarey1511."},
  { username: "Viva_peru_69", password: "19237"},
  { username: "Lucas_Ov", password: "Lucas150710"},
  { username: "Danifusio", password: "1234xd"},
  { username: "NITINHO_20", password: "Nito202017"},
]

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (isAuthenticated === "true") {
      router.push("/privada")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simple validation
    if (!username || !password) {
      setError("Por favor, introduce usuario y contraseña")
      setLoading(false)
      return
    }

    // Check credentials
    const isValid = validCredentials.some((cred) => cred.username === username && cred.password === password)

    if (isValid) {
      // Store authentication state
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("username", username)

      // Redirect to private resources
      setTimeout(() => {
        router.push("/privada")
      }, 500)
    } else {
      setError("Usuario o contraseña incorrectos")
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
          <p className="text-gray-600 mt-2">Accede a recursos privados de ZIMGo</p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Introduce tu usuario"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Introduce tu contraseña"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            ¿No tienes cuenta? {" "}
            <a href="/cuenta" className="text-green-500 hover:text-green-600">
              Regístrate
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
