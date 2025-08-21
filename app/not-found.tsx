import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Image
          src="/images/pepe404.png"
          alt="Pepe se ha perdido - Error 404"
          width={800}
          height={600}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  )
}
