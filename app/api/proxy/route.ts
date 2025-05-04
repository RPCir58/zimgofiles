import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(url)
    const contentType = response.headers.get("content-type") || "text/html"
    const data = await response.text()

    return new NextResponse(data, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch the URL" }, { status: 500 })
  }
}
