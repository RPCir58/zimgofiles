import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full h-full relative">
        <Image
          src="/images/pepe404.png"
          alt="Pepe se ha perdido - Error 404"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
