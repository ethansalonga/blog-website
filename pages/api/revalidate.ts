// https://<your-site.com>/api/revalidate?secret=<token>
// http://localhost:3000/api/revalidate?path=/&secret=d190d8e9e11f1d6d7935d1d2626f7a52

import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" })
  }

  const path = req.query.path as string

  await res.revalidate(path)

  return res.json({ revalidated: true })
}
