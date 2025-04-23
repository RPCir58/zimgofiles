import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <div className="mb-4 p-3 rounded-full bg-green-50">
          <BookOpen className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold mb-6">Acerca de ZIMGo</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">Conoce más sobre nuestra plataforma y nuestro objetivo.</p>
      </div>

      <div className="max-w-4xl mx-auto prose">
        <h2>¿Qué es ZIMGo?</h2>
        <p>
          ZIMGo es una plataforma web diseñada para proporcionar acceso a diversos servicios y herramientas directamente
          desde tu navegador, sin necesidad de descargar aplicaciones adicionales. Nuestro objetivo es simplificar el
          acceso a juegos, herramientas de productividad y contenido web en entornos donde pueden existir restricciones.
        </p>

        <h2>Nuestra Misión</h2>
        <p>
          Nuestra misión es democratizar el acceso a contenido digital y herramientas útiles, permitiendo a los usuarios
          disfrutar de una experiencia web completa sin limitaciones técnicas o geográficas.
        </p>

        <h2>Características Principales</h2>
        <ul>
          <li>
            <strong>Juegos en el Navegador:</strong> Accede a juegos populares directamente desde tu navegador sin
            necesidad de instalaciones.
          </li>
          <li>
            <strong>Navegación Sin Restricciones:</strong> Utiliza nuestro servicio Unblocked Web para acceder a sitios
            web que podrían estar restringidos en tu red.
          </li>
          <li>
            <strong>Herramientas de Productividad:</strong> Próximamente, tendrás acceso a calculadoras, traductores,
            notas y más herramientas útiles.
          </li>
          <li>
            <strong>Chat Integrado:</strong> Comunícate con otros usuarios de ZIMGo a través de nuestro chat integrado.
          </li>
        </ul>

        <h2>Equipo</h2>
        <p>
          ZIMGo es desarrollado por un equipo de entusiastas de la tecnología comprometidos con crear una web más
          accesible y sin barreras. Nuestro equipo trabaja constantemente para mejorar la plataforma y añadir nuevas
          funcionalidades.
        </p>

        <h2>Contacto</h2>
        <p>
          Si tienes preguntas, sugerencias o comentarios sobre ZIMGo, no dudes en contactarnos a través de nuestro{" "}
          <Link href="/zimchat" className="text-green-500 hover:text-green-600">
            chat
          </Link>{" "}
          o enviándonos un correo electrónico a <code className="text-green-500">contacto@zimgo.example.com</code>.
        </p>
      </div>
    </div>
  )
}
