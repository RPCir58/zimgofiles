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
          Somos unos alumnos de secundaria anónimos con conocimientos de programación que crearon este sitio web con el objetivo de emprender un proyecto grande personal y que se expanda por España. Actualizamos casi todos los días nuestro proyecto para solucionar errores, añadir cosas nuevas y hacer la web accesible.
        </p>

        <h2>Nuestro objetivo</h2>
        <p>
          Queremos que aquellas personas que buscan alguna manera de entretenerse en clase, sacarle provecho a un dispositivo bloqueado o usarlo libremente de la manera más fácil y sencilla posible puedan hacerlo. Por eso en nuestra web ofrecemos juegos, funciones útlies, una proxy para entrar a cualquier web y mucho más.
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

        <h2>💚 Partners y Miembros</h2>
          <p>
            Gente que está colaborando o trabajando en ZIMGo.
            No aparecen todas las personas, muchas están ocultas por privacidad.
          </p>
          <h3>+20 usuarios registrados</h3>
          <p>
           frsnt, palmerapalmero, mayonesa, Blanco.Alessandro, MEMEWORLD, Mario, SoyDieguito72YT, loose, NITINHO_20, YeraymCuesta, Viva_peru_69, Danifusio y 10 más.
          </p>
          <h3>8 partners distribuidos entre 5 centros</h3>
          <p>
            SoyDieguito72YT, MEMEWORLD, Danifusio, mayonesa, palmerapalmero y 3 más.
          </p>
          <p>{" "}</p>
          <p>
           <a href="/legal" className="text-green-500 hover:text-green-600">
              Información legal
           </a>
          </p>
      </div>
    </div>
  )
}
