import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

type Response = {
  event: {
    id: number
    title: string
    transcript: string
    createdAt: Date
  } | {}
  error?: string
}

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const { method } = req
  const eventId = Number(req.query.id)

  if (method !== 'GET') { return res.status(404) }
  if (eventId === NaN) { return res.status(400).json({ event: {}, error: 'eventId is invalid' }) }

  const prisma = new PrismaClient()
  prisma.event.findUnique({
    where: {
      id: eventId
    }
  }).then(event => {
    if (event === null) { return res.status(404).json({ event: {}, error: 'event not found' })}
    res.status(200).json({ event: { id: event.id, title: event.title, transcript: event.transcript, createdAt: event.createdAt } })
  }).catch(error => {
    res.status(500).json({ event: {}, error: error })
  })
}

export default handler
