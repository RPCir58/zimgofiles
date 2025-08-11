"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PepeJu3gaPage() {
  const [animation, setAnimation] = useState("")
  const [clicks, setClicks] = useState(0)
  const [currentMessage, setCurrentMessage] = useState("¡Tócame!")

  const animations = [
    "animate-bounce",
    "animate-spin",
    "animate-pulse",
    "animate-ping",
    "animate-wiggle",
    "animate-shake",
    "animate-flip",
    "animate-dance",
  ]

  const messages = [
    "hola",
    "wiii",
    "me llamo pepe",
    "que tal",
    "tocame tocame",
    "me lo paso pipa contigo :)",
    "QUE MAREO",
    "molas mucho ser misterioso que me está viendo",
    "BASTA",
    "estoy cansado jefe",
    "sigueeee",
    "ez incdeible!!",
    "wowowowowowhjfdnjf",
    "no te vayas nunca porfa!",
    "AAAAACHUUUUUUUU",
    "Wow como no se te cansa el dedo",
    "Uaaaaaaaahufdsvf",
    "Como eres capaz de dar tantos clicks",
    "Tú no usarás Adblock no?",
    "Cómo me descubriste?",
    "¡Para un poco joder!",
    "Espero que no seas un profe... no me bloquearás no? :(",
    "Me dan mucho miedo los que bloquean las webs en mi cole no quiero q me maten :(",
    "gracias por usar zimgo!",
    "como descubriste zimgo?",
    "eres increíble! wow",
    "no se que mensajes poner fuera coñas ayudaaaaa",
    "aaaablublubdbsdvdbusbdis",
    "Sabías que el desarrollo de ZIMGo empezó el 8 de abril de 2025?",
    "Bla bla bla ble ble ble blu blublu",
    "skibidi toilet",
    "patrulla canina patrulla canina guau",
    "SOCORRO ESTA ARMANDO AAAAAAAAA",
  ]

  const handlePepeClick = () => {
    setClicks((prev) => prev + 1)

    // Random animation
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
    setAnimation(randomAnimation)

    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setCurrentMessage(randomMessage)

    // Clear animation after 1 second
    setTimeout(() => {
      setAnimation("")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <Link
          href="/servicios"
          className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Servicios
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-green-600">{clicks}</div>
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-green-600 font-medium min-h-[1.5rem]">{currentMessage}</p>
        </div>

        {/* Interactive Pepe */}
        <div className="relative mb-8">
          <button
            onClick={handlePepeClick}
            className={`w-48 h-48 ${animation} transition-all duration-300 hover:scale-110 cursor-pointer select-none`}
          >
            <Image
              src="/images/pepejuega.png"
              alt="Pepe interactivo"
              width={200}
              height={200}
              className="w-full h-full object-contain"
            />
          </button>
        </div>

        {/* Fun message */}
        <div className="mt-12 text-center max-w-md">
          <p className="text-sm text-gray-500">¡Haz click en Pepe y descubre sus mensajes más ocultos!</p>
        </div>
      </div>
    </div>
  )
}
