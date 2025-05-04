"use client"

export default function MinecraftPage() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        src="https://eaglercraft.com/mc/1.5.2/?userscript=flameddogo99-eaglermobile.js"
        title="Minecraft 1.5.2"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        allow="fullscreen; microphone; camera; display-capture; cross-origin-isolated"
        allowFullScreen={true}
      />
    </div>
  )
}
