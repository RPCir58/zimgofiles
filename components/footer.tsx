import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00DC82"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 mr-2"
            >
              <path d="M12 2L2 19.7778H22L12 2Z" fill="#00DC82" stroke="#00DC82" />
            </svg>
            <a href="/" className="font-semibold">
              ZIMGo
            </a>
          </div>

          <div className="flex space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-green-500 transition-colors">
              Acerca de
            </Link>
            <Link href="/servicios" className="text-gray-600 hover:text-green-500 transition-colors">
              Servicios
            </Link>
            <Link href="/ju3gos" className="text-gray-600 hover:text-green-500 transition-colors">
              Juegos
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ZIMGo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
