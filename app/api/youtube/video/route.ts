import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const videoId = searchParams.get("id")

  if (!videoId) {
    return NextResponse.json({ error: "Video ID is required" }, { status: 400 })
  }

  try {
    const API_KEY = "AIzaSyCP4A8UIcZiqSlSkZvdLTvWyJvk-dgT9nk"
    const videoUrl =
      "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=" +
      videoId +
      "&key=" +
      API_KEY

    const response = await fetch(videoUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error("YouTube API error:", response.status, response.statusText)
      return NextResponse.json(generateMockVideoData(videoId))
    }

    const data = await response.json()
    const video = data.items ? data.items[0] : null

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    const videoData = {
      id: video.id,
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      description: video.snippet.description,
      publishedAt: formatDate(video.snippet.publishedAt),
      views: formatViews(video.statistics.viewCount),
      likes: formatViews(video.statistics.likeCount || "0"),
      duration: formatDuration(video.contentDetails.duration),
      thumbnail: video.snippet.thumbnails.maxres
        ? video.snippet.thumbnails.maxres.url
        : video.snippet.thumbnails.high.url,
    }

    return NextResponse.json(videoData)
  } catch (error) {
    console.error("YouTube API error:", error)
    return NextResponse.json(generateMockVideoData(videoId))
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "hace 1 día"
  if (diffDays < 7) return "hace " + diffDays + " días"
  if (diffDays < 30) return "hace " + Math.floor(diffDays / 7) + " semanas"
  if (diffDays < 365) return "hace " + Math.floor(diffDays / 30) + " meses"
  return "hace " + Math.floor(diffDays / 365) + " años"
}

function formatViews(count: string): string {
  const num = Number.parseInt(count)
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B"
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
  if (num >= 1000) return (num / 1000).toFixed(1) + "K"
  return num.toString()
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  if (!match) return "0:00"

  const hours = Number.parseInt((match[1] || "").replace("H", "") || "0")
  const minutes = Number.parseInt((match[2] || "").replace("M", "") || "0")
  const seconds = Number.parseInt((match[3] || "").replace("S", "") || "0")

  if (hours > 0) {
    return hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")
  }
  return minutes + ":" + seconds.toString().padStart(2, "0")
}

function generateMockVideoData(videoId: string) {
  return {
    id: videoId,
    title: "Video de ejemplo - ZimTube",
    channel: "Canal de ejemplo",
    description: "Esta es una descripción de ejemplo para el video.",
    publishedAt: "hace 1 día",
    views: "1.2M",
    likes: "45K",
    duration: "3:45",
    thumbnail: "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg",
  }
}
