import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")
  const maxResults = searchParams.get("maxResults") || "12"

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    // Using YouTube Data API v3 with your API key
    const API_KEY = "AIzaSyCP4A8UIcZiqSlSkZvdLTvWyJvk-dgT9nk"

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
        query,
      )}&maxResults=${maxResults}&key=${API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      console.error("YouTube API error:", response.status, response.statusText)
      // Fallback to mock data if API fails
      const mockData = generateMockResults(query)
      return NextResponse.json(mockData)
    }

    const data = await response.json()

    // Transform the YouTube API response to our format
    const videos =
      data.items?.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        publishedAt: formatDate(item.snippet.publishedAt),
        description: item.snippet.description,
      })) || []

    return NextResponse.json({ videos, total: data.pageInfo?.totalResults || 0 })
  } catch (error) {
    console.error("YouTube API error:", error)

    // Fallback to mock data
    const mockData = generateMockResults(query)
    return NextResponse.json(mockData)
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "hace 1 día"
  if (diffDays < 7) return `hace ${diffDays} días`
  if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} semanas`
  if (diffDays < 365) return `hace ${Math.floor(diffDays / 30)} meses`
  return `hace ${Math.floor(diffDays / 365)} años`
}

function generateMockResults(query: string) {
  const mockVideos = [
    {
      id: "dQw4w9WgXcQ",
      title: `${query} - Rick Astley Never Gonna Give You Up`,
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      channel: "Rick Astley",
      publishedAt: "hace 15 años",
      description: "The official video for Rick Astley's Never Gonna Give You Up",
    },
    {
      id: "9bZkp7q19f0",
      title: `${query} - PSY GANGNAM STYLE`,
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg",
      channel: "officialpsy",
      publishedAt: "hace 11 años",
      description: "PSY - GANGNAM STYLE(강남스타일) M/V",
    },
    {
      id: "kJQP7kiw5Fk",
      title: `${query} - Luis Fonsi Despacito ft. Daddy Yankee`,
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg",
      channel: "LuisFonsiVEVO",
      publishedAt: "hace 6 años",
      description: "Luis Fonsi - Despacito ft. Daddy Yankee",
    },
    {
      id: "fJ9rUzIMcZQ",
      title: `${query} - Queen Bohemian Rhapsody`,
      thumbnail: "https://img.youtube.com/vi/fJ9rUzIMcZQ/mqdefault.jpg",
      channel: "Queen Official",
      publishedAt: "hace 13 años",
      description: "Queen – Bohemian Rhapsody (Official Video Remastered)",
    },
    {
      id: "JGwWNGJdvx8",
      title: `${query} - Ed Sheeran Shape of You`,
      thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/mqdefault.jpg",
      channel: "Ed Sheeran",
      publishedAt: "hace 7 años",
      description: "Ed Sheeran - Shape of You (Official Video)",
    },
    {
      id: "YQHsXMglC9A",
      title: `${query} - Adele Hello`,
      thumbnail: "https://img.youtube.com/vi/YQHsXMglC9A/mqdefault.jpg",
      channel: "AdeleVEVO",
      publishedAt: "hace 8 años",
      description: "Adele - Hello (Official Music Video)",
    },
  ]

  return { videos: mockVideos, total: mockVideos.length }
}
