import { GamepadIcon as GameController } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function GamesPage() {
  // Array of game objects with custom titles and descriptions
  const games = [
    {
      id: 1,
      title: "Minecraft",
      description: "Juega a Minecraft 1.8.8 desde ZIMGo.",
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
      title: "Fruit Ninja",
      description: "Corta las frutas y evita las bombas en este juego tan adictivo.",
      image:
        "https://www.coolmathgames.com/sites/default/files/styles/mobile_game_image/public/FruitNinja_OG-Logo.jpg.webp?itok=p9HjDBpn",
      link: "/retro/fruit-ninja",
    },
    {
      id: 4,
      title: "Flappy Bird",
      description: "Salta y evita tocar las tuberías con este gran clásico.",
      image: "https://techfrontier.com.au/wp-content/uploads/2025/07/Remembering-Flappy-Bird.jpg",
      link: "/retro/flappy-bird",
    },
    {
      id: 5,
      title: "Subway Surfers",
      description: "Juega a Subway Surfers desde ZIMGo.",
      image:
        "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2017/03/subway-surfers.jpg?tf=3840x",
      link: "/subway-surfers",
    },
    {
      id: 6,
      title: "Agar.io",
      description: "Comete a las bolas pequeñas y hazte cada vez más grande.",
      image: "https://lh4.googleusercontent.com/proxy/bNZXGsuurxs7ZIBx8ELmxnrI5knk0AyZ62k2FEYq5DXRNWnwtsoCY5HaGsri5WkUI_yfL8Bg290MY7IFZakgVlJHU72uSANfr9Yb5bvgN8j9Y2Jp00A",
      link: "/retro/agario",
    },
    {
      id: 7,
      title: "Level Devil",
      description: "Divertido y a la vez frustrante, juego de plataformas.",
      image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3242750/a78a03f1047a590e6b9b0360ec361924d7f98959/capsule_616x353.jpg?t=1743000677",
      link: "/level-devil",
    },
    {
      id: 8,
      title: "Crossy Road",
      description: "Cruza la carretera en este juego infinito de estrategia.",
      image: "https://static1.squarespace.com/static/5cedd5e7c6e7df0001bbb67c/t/675b681dbe3e687a57ff005c/1734043683478/CrossyRoad_Banner.png?format=1500w",
      link: "/crossy-road",
    },
    {
      id: 9,
      title: "FC 25",
      description: "Juega a un fan-made de FC 25 en ZIMGo.",
      image: "https://img.asmedia.epimg.net/resizer/v2/OM6D4IGPLFHZTLNP2PZVXGJY3Q.jpg?auth=37c91b6633b9bb6c9e2dc06573b562af0ac5ddae99eebd9a4e65b50ddd07d5a2&width=644&height=362&smart=true",
      link: "/fc-25",
    },
    {
      id: 10,
      title: "Krunker.io",
      description: "Juega a diferentes modalidades shooter como FFA, Deadmatch o Capture the Flag.",
      image:
        "https://imgs.crazygames.com/games/krunker-io/cover-1591336739727.png?metadata=none&quality=100&width=1200&height=630&fit=crop",
      link: "/krunker",
    },
    {
      id: 11,
      title: "Car Racing",
      description: "¡Esquiva a los coches en este juego de carreras dinámico!",
      image:
        "https://cdn1.epicgames.com/spt-assets/9a81f51cb53441daa0adb2c3bd1d46dd/mr-racer--premium-1us35.jpg?resize=1&w=480&h=270&quality=medium",
      link: "/car-racing",
    },
    {
      id: 12,
      title: "Friday Night Funkin",
      description: "Juega a FNF de itch.io desde ZIMGo. Solo para dispositivos con teclado.",
      image: "https://abg-static.s3.amazonaws.com/media/fridaynightfunkin-thumbnail.webp",
      link: "/fnf",
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
