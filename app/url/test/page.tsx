"use client"

import { useEffect } from "react"

export default function TestRedirect() {
  useEffect(() => {
    window.location.replace("https://google.com")
  }, [])

  return null
}
