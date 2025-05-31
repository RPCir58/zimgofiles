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
        <p className="text-xl text-gray-600 max-w-2xl mb-8">Aprende más acerca de nuestro proyecto.</p>
      </div>

      <div className="max-w-4xl mx-auto prose">
        <h2>¿Quienes somos?</h2>
        <p>
          Somos unos alumnos de secundaria anónimos con conocimientos de programación que crearon este sitio web con el objetivo de emprender un proyecto grande personal y que triunfe. Actualizamos casi todos los días nuestro proyecto para solucionar errores, añadir cosas nuevas y hacer la web accesible.
        </p>

        <h2>Nuestro objetivo</h2>
        <p>
          Queremos que aquellas personas que buscan alguna manera de entretenerse en clase, sacarle provecho al iPad del colegio o usarlo libremente de la manera más fácil y sencilla posible puedan hacerlo. Por eso en nuestra web ofrecemos juegos, funciones útlies, una proxy para entrar a cualquier web y mucho más.
        </p>

        <h2>¡Contáctanos!</h2>
          <p>
            ¿Tienes preguntas, sugerencias o peticiones? ¡Estamos encantados de atenderte! Envíanos un email a {" "}
            <a href="mailto:alguien.raro.muy.extrano@gmail.com" className="text-green-500 hover:text-green-600">
              alguien.raro.muy.extrano@gmail.com
            </a>
            .
            ¡Gracias por hacer que ZIMGo sea posible!
          </p>

        <h2>Disclaimer</h2>
          <p>
            Este proyecto fue creado por un trabajo de una actividad extraescolar de programación. El objetivo no es burlar los sistemas del colegio, solo se aprovechó la ocasión para crear una web grande y con éxito. Los creadores de esta web son anónimos y seguirán manteniendo el proyecto en pie siempre que sea posible. Reservamos el derecho de eliminar el acceso a la web en cualquier momento a una IP, MAC, dispositivo o sistema operativo en específico para mantener la seguridad del mismo.
          </p>
      </div>
    </div>
  )
}
