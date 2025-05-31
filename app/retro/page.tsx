export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">Juegos Retro</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">Accede al apartado premium de ZIM jugando a grandes clásicos.</p>
      </div>

      <div className="max-w-4xl mx-auto prose">
        <h2>
          <a href="/retro/agario" className="text-green-500 hover:text-green-600">
            Agar.io
          </a>
        </h2>
        <h2>
          <a href="/retro/flappy-bird" className="text-green-500 hover:text-green-600">
            Flappy Bird
          </a>
        </h2>
        <h2>
          <a href="/retro/minesweeper" className="text-green-500 hover:text-green-600">
            Minesweeper
          </a>
        </h2>
        <h2>
          <a href="/retro/mario-64" className="text-green-500 hover:text-green-600">
            Super Mario 64 (N64)
          </a>
        </h2>
        <h2>
          <a href="/retro/fruit-ninja" className="text-green-500 hover:text-green-600">
            Fruit Ninja
          </a>
        </h2>
        <p></p>
        <p>Pronto más juegos ❤</p>
      </div>
    </div>
  )
}
