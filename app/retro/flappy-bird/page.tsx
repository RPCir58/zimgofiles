export default function SuperMarioWorldPage() {
  return (
    <iframe
        src="https://emupedia.net/emupedia-game-flappy-bird/"
        title="Flappy Bird"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        allow="fullscreen; microphone; camera; display-capture; cross-origin-isolated"
        allowFullScreen={true}
      />
  )
}
