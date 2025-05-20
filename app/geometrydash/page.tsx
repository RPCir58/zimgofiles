"use client"

export default function MinecraftPage() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        src="https://geometrydashs.io/"
        title="Geometry Dash Lite"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        allow="fullscreen; microphone; camera; display-capture; cross-origin-isolated"
        allowFullScreen={true}
      />
    </div>
  )
}
