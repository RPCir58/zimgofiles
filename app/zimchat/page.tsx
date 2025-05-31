export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">ZimChat Servers</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">Elige un servidor de chat en línea para comenzar.</p>
      </div>

      <div className="max-w-4xl mx-auto prose">
        <h2>
          <a href="/zimchat/1" className="text-green-500 hover:text-green-600">
            Servidor 1 (104.26.7.56)
          </a>
        </h2>
        <h2>
          <a href="/zimchat/2" className="text-green-500 hover:text-green-600">
            Servidor 2 (172.67.207.97)
          </a>
        </h2>
      </div>
    </div>
  )
}
