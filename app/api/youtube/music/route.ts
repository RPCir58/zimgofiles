import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")
  const maxResults = searchParams.get("maxResults") || "20"

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    // Using YouTube Data API v3 with music-specific search
    const API_KEY = "AIzaSyCP4A8UIcZiqSlSkZvdLTvWyJvk-dgT9nk"

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&q=${encodeURIComponent(
        query + " music",
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
      const mockData = generateMockMusicResults(query)
      return NextResponse.json(mockData)
    }

    const data = await response.json()

    // Transform the YouTube API response to our format
    const songs =
      data.items?.map((item: any) => ({
        id: item.id.videoId,
        title: cleanMusicTitle(item.snippet.title),
        artist: extractArtist(item.snippet.title, item.snippet.channelTitle),
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        publishedAt: formatDate(item.snippet.publishedAt),
        description: item.snippet.description,
      })) || []

    return NextResponse.json({ songs, total: data.pageInfo?.totalResults || 0 })
  } catch (error) {
    console.error("YouTube Music API error:", error)

    // Fallback to mock data
    const mockData = generateMockMusicResults(query)
    return NextResponse.json(mockData)
  }
}

function cleanMusicTitle(title: string): string {
  // Remove common music video suffixes and prefixes
  return title
    .replace(/\s*$$Official\s*(Music\s*)?Video$$/gi, "")
    .replace(/\s*$$Official\s*Audio$$/gi, "")
    .replace(/\s*$$Lyric\s*Video$$/gi, "")
    .replace(/\s*$$Lyrics$$/gi, "")
    .replace(/\s*\[Official\s*(Music\s*)?Video\]/gi, "")
    .replace(/\s*\[Official\s*Audio\]/gi, "")
    .replace(/\s*\[Lyric\s*Video\]/gi, "")
    .replace(/\s*\[Lyrics\]/gi, "")
    .replace(/\s*-\s*Official\s*(Music\s*)?Video$/gi, "")
    .replace(/\s*-\s*Official\s*Audio$/gi, "")
    .replace(/\s*-\s*Lyric\s*Video$/gi, "")
    .replace(/\s*Official\s*(Music\s*)?Video$/gi, "")
    .replace(/\s*Official\s*Audio$/gi, "")
    .replace(/\s*Lyric\s*Video$/gi, "")
    .replace(/\s*Video\s*Oficial$/gi, "")
    .replace(/\s*Audio\s*Oficial$/gi, "")
    .replace(/\s*Vídeo\s*Oficial$/gi, "")
    .replace(/\s*$$Video\s*Oficial$$/gi, "")
    .replace(/\s*$$Audio\s*Oficial$$/gi, "")
    .replace(/\s*$$Vídeo\s*Oficial$$/gi, "")
    .replace(/\s*\[Video\s*Oficial\]/gi, "")
    .replace(/\s*\[Audio\s*Oficial\]/gi, "")
    .replace(/\s*\[Vídeo\s*Oficial\]/gi, "")
    .replace(/\s*HD$/gi, "")
    .replace(/\s*4K$/gi, "")
    .replace(/\s*$$HD$$/gi, "")
    .replace(/\s*$$4K$$/gi, "")
    .replace(/\s*\[HD\]/gi, "")
    .replace(/\s*\[4K\]/gi, "")
    .trim()
}

function extractArtist(title: string, channelTitle: string): string {
  // Try to extract artist from title (format: "Artist - Song")
  const dashSplit = title.split(" - ")
  if (dashSplit.length >= 2) {
    return dashSplit[0].trim()
  }

  // Try to extract artist from title (format: "Artist: Song")
  const colonSplit = title.split(": ")
  if (colonSplit.length >= 2) {
    return colonSplit[0].trim()
  }

  // Fallback to channel title, but clean it up
  return channelTitle
    .replace(/VEVO$/gi, "")
    .replace(/Official$/gi, "")
    .replace(/Music$/gi, "")
    .trim()
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

function generateMockMusicResults(query: string) {
  const mockSongs = [
    {
      id: "kJQP7kiw5Fk",
      title: "Despacito",
      artist: "Luis Fonsi ft. Daddy Yankee",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg",
      channel: "LuisFonsiVEVO",
      publishedAt: "hace 6 años",
      description: "Luis Fonsi - Despacito ft. Daddy Yankee",
    },
    {
      id: "JGwWNGJdvx8",
      title: "Shape of You",
      artist: "Ed Sheeran",
      thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/mqdefault.jpg",
      channel: "Ed Sheeran",
      publishedAt: "hace 7 años",
      description: "Ed Sheeran - Shape of You (Official Video)",
    },
    {
      id: "YQHsXMglC9A",
      title: "Hello",
      artist: "Adele",
      thumbnail: "https://img.youtube.com/vi/YQHsXMglC9A/mqdefault.jpg",
      channel: "AdeleVEVO",
      publishedAt: "hace 8 años",
      description: "Adele - Hello (Official Music Video)",
    },
    {
      id: "fJ9rUzIMcZQ",
      title: "Bohemian Rhapsody",
      artist: "Queen",
      thumbnail: "https://img.youtube.com/vi/fJ9rUzIMcZQ/mqdefault.jpg",
      channel: "Queen Official",
      publishedAt: "hace 13 años",
      description: "Queen – Bohemian Rhapsody (Official Video Remastered)",
    },
    {
      id: "9bZkp7q19f0",
      title: "Gangnam Style",
      artist: "PSY",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg",
      channel: "officialpsy",
      publishedAt: "hace 11 años",
      description: "PSY - GANGNAM STYLE(강남스타일) M/V",
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Never Gonna Give You Up",
      artist: "Rick Astley",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      channel: "Rick Astley",
      publishedAt: "hace 15 años",
      description: "The official video for Rick Astley's Never Gonna Give You Up",
    },
  ]

  // Filter songs that might match the query
  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) || song.artist.toLowerCase().includes(query.toLowerCase()),
  )

  return {
    songs: filteredSongs.length > 0 ? filteredSongs : mockSongs.slice(0, 4),
    total: filteredSongs.length > 0 ? filteredSongs.length : 4,
  }
}
