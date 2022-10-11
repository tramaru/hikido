import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'prisma/client';
import type { Event } from 'types/Event';

type Response = {
  event?: Event
  error?: String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { method } = req
  const eventId = Number(req.query.id)

  if (method !== 'GET') { return res.status(404) }
  if (eventId === NaN) { return res.status(400).json({ error: 'eventId is required' }) }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId
    }
  })

  prisma.$disconnect();

  if (event === null) { return res.status(404).json({ error: 'event not found' })}

  res.status(200).json({ event: event })
}
