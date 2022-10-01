
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from 'types/Event'

type Response = {
  events: Event[]
  error?: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const { method } = req
  if (method !== 'GET') { return res.status(404) }

  let ids: number[] = []
  if (req.query.ids !== undefined) { ids = [req.query.ids].flat(1).map((id: string) => Number(id)) }

  findEvents(ids)
    .then(event => {
      res.status(200).json({ events: event })
    })
    .catch(error => {
      res.status(500).json({ events: [], error: error })
    })
}

const findEvents = async (ids: number[]) => {
  const prisma = new PrismaClient()

  if (ids.length === 0) {
    return prisma.event.findMany()
  } else {
    return prisma.event.findMany({
      where: {
        id: { in: ids }
      }
    })
  }
}

export default handler
