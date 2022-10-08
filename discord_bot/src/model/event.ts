import type { Event } from '../types/Event'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type EventElement = Pick<Event, 'title' | 'audioUrl' | 'transcriptUrl' | 'transcript'>

export const createEvent = async (event: EventElement) => {
  const { title, audioUrl, transcriptUrl, transcript } = event
  return prisma.event.create({ data: { title, audioUrl, transcriptUrl, transcript: transcript ?? '' } })
}
