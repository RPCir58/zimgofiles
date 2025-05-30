import { Rocket, Package, BookOpen } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9475016885014082"
     crossorigin="anonymous"></script>
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00DC82"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-16 w-16"
          >
            <path d="M12 2L2 19.7778H22L12 2Z" fill="#00DC82" stroke="#00DC82" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-6">ZIMGo Webpage</h1>
          <p className="mb-4">
            Únete al canal de{" "}
            <a
              href="https://whatsapp.com/channel/0029VbB4Qr1J93wNd5Ni9Q34"
              className="text-green-500 hover:text-green-600"
            >
              WhatsApp
            </a>{" "}
            y recibe todas las novedades
          </p>
        <div className="w-full max-w-3xl border border-gray-200 rounded-lg p-8 mb-12">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-lg border border-green-200 flex items-center justify-center">
              <Rocket className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Juegos</h2>
          <p className="text-gray-600 mb-4">Accede al catálogo de juegos de ZIMGo.</p>
          <Link href="/ju3gos" className="text-green-500 hover:text-green-600 transition-colors">
            Acceder ahora →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="h-12 w-12 rounded-lg border border-gray-200 flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Unblocked Web</h3>
            <p className="text-gray-600 mb-4">Accede a cualquier página web rápidamente sin salir de ZIMGo.</p>
            <Link href="/unbl0cked-w3b" className="text-green-500 hover:text-green-600 transition-colors">
              Acceder ahora →
            </Link>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="h-12 w-12 rounded-lg border border-gray-200 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Servicios</h3>
            <p className="text-gray-600 mb-4">Descubre todas las herramientas y servicios que ZIMGo ofrece.</p>
            <Link href="/servicios" className="text-green-500 hover:text-green-600 transition-colors">
              Ver servicios →
            </Link>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 md:col-span-2">
            <div className="h-12 w-12 rounded-lg border border-gray-200 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Acerca de ZIMGo</h3>
            <p className="text-gray-600 mb-4">Aprende más acerca de nosotros y nuestro objetivo.</p>
            <Link href="/about" className="text-green-500 hover:text-green-600 transition-colors">
              Conocer más →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
