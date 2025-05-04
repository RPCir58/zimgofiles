"use client"

export default function MinecraftPage() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        src="https://d1tm91r4ytbt54.cloudfront.net/2779cbcb-a02f-48a3-9e2e-95a8d123d165/1685483461665/web/index.html"
        title="Minecraft 1.5.2"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        allow="fullscreen; microphone; camera; display-capture; cross-origin-isolated"
        allowFullScreen={true}
      />
    </div>
  )
}
