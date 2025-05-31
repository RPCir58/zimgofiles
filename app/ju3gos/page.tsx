import { GamepadIcon as GameController } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function GamesPage() {
  // Array of game objects with custom titles and descriptions
  const games = [
    {
      id: 1,
      title: "Minecraft",
      description: "Juega a Minecraft 1.5.2 desde ZIMGo. Solo disponible para dispositivos con teclado.",
      image: "/images/minecraft.png",
      link: "/minecraft",
    },
    {
      id: 2,
      title: "Geometry Dash",
      description: "Juega a Geometry Dash Lite desde ZIMGo. Compatible con modo táctil.",
      image: "/images/geometrydash.jpg",
      link: "/geometrydash",
    },
    {
      id: 3,
      title: "Retro",
      description: "Juega a gran variedad de clásicos Retro desde ZIMGo.",
      image: "/images/retro.jpg",
      link: "/retro",
    },
    {
      id: 4,
      title: "Cryzen",
      description: "El shooter como Fortnite multijugador web con más usuarios activos.",
      image: "/images/cryzen.jpg",
      link: "/cryzen",
    },
    {
      id: 5,
      title: "Subway Surfers",
      description: "Juega a Subway Surfers desde ZIMGo.",
      image: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2017/03/subway-surfers.jpg?tf=3840x",
      link: "/subway-surfers"
    },
    {
      id: 6,
      title: "Game Title 6",
      description: "A short description of the game and what makes it fun to play.",
      image: null,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <div className="mb-4 p-3 rounded-full bg-green-50">
          <GameController className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold mb-6">Juegos ZIM</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">Juega a lo que quieras de forma rápida y sencilla.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {games.map((game) => (
          <div
            key={game.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              {game.image ? (
                <Image
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-gray-400">Game {game.id} Coming Soon</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{game.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{game.description}</p>
              {game.link ? (
                <Link href={game.link} className="text-green-500 font-medium hover:text-green-600 transition-colors">
                  Jugar desde ZIMGo
                </Link>
              ) : (
                <button className="text-green-500 font-medium hover:text-green-600 transition-colors">
                  Jugar desde ZIMGo
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
