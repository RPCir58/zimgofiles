import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto prose">
        <p>
          Espera... tú no deberías estar viendo esto.
        </p>
        <p>
          ¿Cómo has llegado hasta aquí?
        </p>
        <p>
          Me encontraste por ZIM App Demo, o llegaste por algún rincón de ZIMGo...
        </p>
        <p>
          Está página se utiliza para la detección automática de actualizaciones de ZIM App.
        </p>
        <p>
          Si has llegado hasta aquí por error, avísanos por favor:
          {" "}
          <a href="mailto:alguien.raro.muy.extrano@gmail.com" className="text-green-500 hover:text-green-600">
              alguien.raro.muy.extrano@gmail.com
            </a>
        </p>
        <p>
          Está es la versión más reciente de ZIM App Demo Edition:
        </p>
        <p>
          5.0
        </p>
      </div>
    </div>
  )
}
// CAMBIA DEBAJO DEL TEXTO "VERSION MAS RECIENTE..." POR LA NUEVA VERSIÓN. ESO ES LO QUE ZIM APP DETECTA.
