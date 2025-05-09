import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query

  if (!url) {
    return res.status(400).json({ error: "No URL provided" })
  }

  try {
    const response = await fetch(url as string)
    const data = await response.text()

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(data)
  } catch (error) {
    res.status(500).json({ error: "Error fetching the page" })
  }
}
