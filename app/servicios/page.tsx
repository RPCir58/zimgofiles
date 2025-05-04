import { Wrench } from "lucide-react"
import Link from "next/link"

export default function ServiciosPage() {
  // Array of services with titles, descriptions and icons
  const services = [
    {
      id: 1,
      title: "Juegos",
      description: "Juega a lo que quieras sin salir de ZIMGo.",
      icon: (
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
          className="text-green-500"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M12 12h.01" />
          <path d="M17 12h.01" />
          <path d="M7 12h.01" />
        </svg>
      ),
      link: "/ju3gos",
    },
    {
      id: 2,
      title: "Unblocked Web",
      description: "Evita las restricciones de internet navegando sin salir de ZIMGo.",
      icon: (
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
          className="text-green-500"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      link: "/unblocked-web",
    },
    {
      id: 3,
      title: "ZimChat",
      description: "Comunícate con otros usuarios de ZIMGo a través de nuestro chat integrado.",
      icon: (
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
          className="text-green-500"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01" />
          <path d="M12 10h.01" />
          <path d="M16 10h.01" />
        </svg>
      ),
      link: "/zimchat",
      comingSoon: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <div className="mb-4 p-3 rounded-full bg-green-50">
          <Wrench className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold mb-6">Servicios</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          Descubre todas las herramientas y servicios que ZIMGo ofrece para mejorar tu experiencia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service) => (
          <div key={service.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-green-50 mr-3">{service.icon}</div>
              <h3 className="font-semibold text-lg">{service.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <Link
              href={service.link}
              className={`text-green-500 font-medium hover:text-green-600 transition-colors ${
                service.comingSoon ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {service.comingSoon ? "Próximamente" : "Acceder ahora"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
