import { Globe } from "lucide-react"

export default function UnblockedWebPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <div className="mb-4 p-3 rounded-full bg-green-50">
          <Globe className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold mb-6">Unblocked Web</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">Accede a webs restringidas sin salir de ZIMGo.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Visitar Sitio Web</h2>
          <p className="text-gray-600 mb-6">Escribe la URL del sitio web al que quieres acceder abajo:</p>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://zimgo.vercel.app/"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Go
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Populares en ZIMGo</h3>
            <ul className="space-y-2">
              {["YouTube", "TikTok", "Scratch", "Poki", "Google"].map((site) => (
                <li key={site}>
                  <button className="text-green-500 hover:text-green-600 transition-colors">{site}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Visitado recientemente</h3>
            <p className="text-gray-500 text-sm">
              Los sitios webs que hayas visitado recientemente desde ZIMGo se mostrarán aquí.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
