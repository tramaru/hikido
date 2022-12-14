import { prisma } from 'prisma/client'
import type { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from 'types/Event'

type Response = {
  events: Event[] | null
  error: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { method } = req
  let query = ""
  if (req.query.q !== undefined || req.query.q !== "") {
    query = [req.query.q].flat(1).join(' ');
  }

  if (method !== 'GET') { return res.status(404) }

  try {
    const events = await findManyEventWithQuery(prisma, query)
    res.status(200).json({ events: events, error: null })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ events: null, error: error.message })
  } finally {
    prisma.$disconnect();
  }
}

const findManyEventWithQuery = async (prisma: PrismaClient, query: string) => {
  let events = []

  if (query === "") {
    events = await prisma.event.findMany();
  } else {
    events = await prisma.event.findMany({
      where: {
        transcript: {
          search: query
        },
      },
    })
  }

  return events
}
