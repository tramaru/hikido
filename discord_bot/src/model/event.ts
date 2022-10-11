import type { Event } from '../types/Event'
import { prisma } from '../../prisma/client'

export type EventElement = Pick<Event, 'title' | 'audioUrl' | 'transcriptUrl' | 'transcript'>

export const createEvent = async (event: EventElement) => {
  const { title, audioUrl, transcriptUrl, transcript } = event
  return prisma.event.create({ data: { title, audioUrl, transcriptUrl, transcript: transcript ?? '' } })
}
