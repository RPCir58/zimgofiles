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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">ZIM App</h1>
            <p className="text-gray-600">Descarga la aplicación oficial de ZIM en tu iPad del colegio.</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>

        {/* App Features */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">ZIM App - Aplicación para el iPad</h2>
            <p className="text-gray-600">Usa todo ZIM y funciones extras desde un atajo dinámico para el iPad.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">Acceso Offline</h3>
              <p className="text-sm text-gray-600">Usa ZIM App incluso sin conexión a internet</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <Star className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Funciones Exclusivas</h3>
              <p className="text-sm text-gray-600">Características solo disponibles en la app</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                <Shield className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-semibold mb-2">Más Seguro</h3>
              <p className="text-sm text-gray-600">Desinstalación fácil y aviso de actualización</p>
            </div>
          </div>
        </div>

        {/* Download Sections */}
        <div className="max-w-2xl mx-auto mb-8">
          {/* Desktop Downloads */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-blue-50 mr-3">
                <Monitor className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-lg">Enlaces de descarga</h3>
            </div>
            <p className="text-gray-600 mb-6">Descarga ZIM App en tu dispositivo con pocos clicks.</p>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">ZIM App 3.0</h4>
                  <p className="text-sm text-gray-500">Release v3.0 26/04/2025</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    <Download className="h-4 w-4 inline mr-2" />
                    <a href="https://download1529.mediafire.com/44lk0n24oymgKH4JHYe8h17Uf7SS7NFitT7_XuKJHWNJVM_5QCr06k-iXnPlL21xK3dP3id23Yxt_IqoQSK8V63hHwN3G-YwtOCyLPC7rPMSlDegzdd6OSxtbbu1RWFz1Iqpqb3Qa9V-rxH96Q6HrSUOKPfzfp9i0O2-C9_GIS7t9hWg/jpozlifqxedhv7c/ZimApp-Installer-3.0.zip" className="">
              Descarga directa
            </a>
            
                  </button>
                  <button className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition-colors text-sm">
                    QR para iPad
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">ZIM App Demo 2.0</h4>
                  <p className="text-sm text-gray-500">Demo v2.0 24/05/2025</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                    <Download className="h-4 w-4 inline mr-2" />
                    <a href="https://download1655.mediafire.com/se3umgry76oggPRh5ubvllOxoHRXJTnjsKXn6hxr_PJBIVvMkDIbYOKSUBMQShzxvNPkuiC7A1IP0F9Z1Q-gL15RWFiNTrTT3-JIB7UaulykDcz1y1HndeVw2K1jmca3EWbpcj-PNkFYA5mkSob6Xz7BSWuthNzYfBGkOL9YEd2g0G4e/rmlr6tm2b8uk0b0/ZimAppDemo-Installer-4.0.zip" className="">
              Descarga directa
            </a>
                  </button>
                  <button className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition-colors text-sm">
                    QR para iPad
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">Early Access</h4>
                  <p className="text-sm text-gray-500">Ninguna versión disponible</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
                    <Download className="h-4 w-4 inline mr-2" />
                    No disponible
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Downloads */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold">Descargas Adicionales</h3>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">ZIM App 2.1</h4>
                <p className="text-sm text-gray-500">Update v2.1 25/03/2025</p>
              </div>
              <button className="text-green-500 hover:text-green-600 font-medium">
                <Download className="h-4 w-4 inline mr-2" />
                <a href="https://download944.mediafire.com/q85jjmyhgizgS84iNvZ5XyMF6-szAZVb5OhPfvGhSq_fkffkFPmg_8XB0mqPyR8BH8L0bXXM1gRf6DhHTmoyI_cswLYZ7rWDsdFcazoTKbx_w9Vb_3y7kSb1y_P4_yL3O32WIN3KVK1Gdz9xa174T8VzWnWBBkAfNHk2N57w91YV8w7C/09whsma9akwpvkd/ZimApp-Installer-2.1.zip" className="">
              Descargar
            </a>
              </button>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">ZIM App 2.0</h4>
                <p className="text-sm text-gray-500">Release v2.0 21/03/2025</p>
              </div>
              <button className="text-green-500 hover:text-green-600 font-medium">
                <Download className="h-4 w-4 inline mr-2" />
                <a href="https://download1324.mediafire.com/ngg4xrdxj7pgFSoUPu1eru71w0wf_bZaoNR0rfMXa0kXIYPbgvT1voOd61EfKtPNYfGehVtAxWMdoTSKiiHL9tjGNcTNurw4P-DDuQeB9w8Su-1o65UiYPoOmSGgTY75VXD1-WmWRR1irBk8ntVFz-VZ7c_gcU01dxNfAfi5guXuJ8qg/0mjvwzh8965sbvi/ZimApp-Installer-2.0.zip" className="">
              Descargar
            </a>
              </button>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">ZIM App 1.5</h4>
                <p className="text-sm text-gray-500">Release v1.5 21/02/2025</p>
              </div>
              <button className="text-green-500 hover:text-green-600 font-medium">
                <Download className="h-4 w-4 inline mr-2" />
                <a href="https://download1350.mediafire.com/sw5ghdtye8jg49XZ_ac1uZ5GWghBqiMudQdsfDM2Oj7dzepso4rhIRfd4VamildtVk9upbrjrWCaX7RqPKe6-hcput_o2leIqc__z6m5qu8l9MiJx8_nJvMrgthcDAImWLBmGYEC8a80o6HX9x-GUlAsTYMyHHymsdZbkCtaK5iORsjL/czytf4blcqbr27b/ZimApp-Installer-1.5.zip" className="">
              Descargar
            </a>
              </button>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">ZIM App 1.2</h4>
                <p className="text-sm text-gray-500">Release v1.2 09/01/2025</p>
              </div>
              <button className="text-green-500 hover:text-green-600 font-medium">
                <Download className="h-4 w-4 inline mr-2" />
                <a href="https://download1347.mediafire.com/2k2yo34p93egLt58Te5MrIlYYsaPfjXvBnbdOW7q0jKl66tT9Y_Q2bG0AsF6VaR_YDtPeks6ELbTDoVPnpfWdivekNmgFipf65ngEGTgRDiAVM2ks7qeVRvFIOGkIffAKLXHua94-dduIbStC5soMHT_bLndLkFqjKjw-4_WHU9tADeV/tj87xdx5wz4e5hm/ZimApp-Installer-1.2.zip" className="">
              Descargar
            </a>
              </button>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">ZIM App 1.0</h4>
                <p className="text-sm text-gray-500">Release v1.0 14/12/2024</p>
              </div>
              <button className="text-green-500 hover:text-green-600 font-medium">
                <Download className="h-4 w-4 inline mr-2" />
                <a href="https://download1591.mediafire.com/80u2akwzs60gToBNTB3Zs7C_qevBJOxlEREDsmI6V7ig3xUqyXVSEGNt4IKlH4Q7CjZDvb2v2GfUpegZd-WXgJvxuroGeu5gQvQtKXnBvYWRiRI9nkYU9x-02ZHAzmTX1wEln3WVZ2EpvIV0JdyRRzBb-bBWV7kX9x8f2zZuxRK1BEH7/c19jhvnfxaltgs0/ZimApp-Installer-1.0.zip" className="">
              Descargar
            </a>
              </button>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">ZIM App Demo 1.0</h4>
                <p className="text-sm text-gray-500">Demo v1.0 25/03/2025</p>
              </div>
              <button className="text-green-500 hover:text-green-600 font-medium">
                <Download className="h-4 w-4 inline mr-2" />
                <a href="https://download1532.mediafire.com/7r3yucwytvtgCTB-TkxSuvMfp95zsz49L0aDdOioUssQwqK8TErXit4fJ4e74SMHxfA0OqB5VRc3ChmsalF0rhQBLKIV4qC52mEOu4WwV7T1TtPMq-G6xxG42qu5k6ThTPLmi8Tvv9TaYE7vOJFgsYGCoyCXOT1HtU4TGj7Ak_snSFdq/jgrdwit7whkdckq/ZimApp-Installer-Demo.zip" className="">
              Descargar
            </a>
              </button>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">Source Code</h4>
                <p className="text-sm text-gray-500">GitHub - Para desarrolladores</p>
              </div>
              <button className="text-green-500 hover:text-green-600 font-medium">Ver en GitHub</button>
            </div>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Instrucciones de Instalación</h3>
          <div className="text-blue-800 text-sm space-y-2">
            <p>
              <strong>iPad:</strong> Exporta el archivo ZIP a la aplicación de Archivos del
              sistema. Púlsalo y accede a tu nueva carpeta llamada "ZimAppFiles". Abre el archivo
              .shortcut con la aplicación de Atajos y pulsa "Añadir atajo" para importarlo.
            </p>
            <p>
              <strong>Aplicación solo disponible para dispositivos Apple o con Apple Shortcuts instalado.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
