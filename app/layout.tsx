import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AdblockDetector from "@/components/adblock-detector"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZIMGo Web",
  description: "Una web hecha para desbloquear creada por RP_Circulo.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <AdblockDetector />
      </body>
    </html>
  )
}
