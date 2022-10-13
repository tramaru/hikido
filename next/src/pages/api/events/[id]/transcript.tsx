import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'; // ES Modules import
import { prisma } from 'prisma/client';
import { Readable } from 'stream';
import type { Event } from 'types/Event';
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PrismaClient } from '@prisma/client'

type Response = {
  event: Event | {}
  error?: String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { method } = req
  const eventId = Number(req.query.id)

  if (method !== 'PUT') { return res.status(404) }
  if (eventId === NaN) { return res.status(400).json({ event: {}, error: 'eventId is required' }) }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId
    }
  })

  if (event === null) { return res.status(404).json({ event: {}, error: 'event not found' })}
  if (event.transcriptUrl === "") { return res.status(404).json({ event: {}, error: 'There is not transcriptUrl' })}

  try {
    const transcript = await fetchTranscript(event.transcriptUrl)
    const updatedEvent = await prismaUpdateEvent(prisma, eventId, transcript)

    res.status(200).json({ event: updatedEvent })
  } catch (error) {
    console.error(error)
    res.status(500).json({ event: {}, error: 'Internal Server Error' })
  }
}

const fetchTranscript = async (url: string) => {
  const bucket = await fetchBucket(url)

  if (bucket === undefined) return null

  const response = await streamToString(bucket.Body as Readable)
  return JSON.parse(response).results.transcripts[0].transcript
}

const prismaUpdateEvent = async (prisma: PrismaClient, eventId: number, transcript: string) => {
  return await prisma.event.update({
    where: {
      id: eventId
    },
    data: {
      transcript: transcript
    }
  })
}

const fetchBucket = (key: string) => {
  const client = new S3Client({
    region: 'ap-northeast-1',
    credentials: {
      accessKeyId: `${process.env.HIKIDO_AWS_ACCESS_KEY_ID}`,
      secretAccessKey: `${process.env.HIKIDO_AWS_SECRET_ACCESS_KEY}`,
    },
  });

  const command = new GetObjectCommand({
    Bucket: `${process.env.HIKIDO_S3_BUCKET}`,
    Key: key,
  });

  try {
    return client.send(command);
  } catch (err) {
    console.log('Error', err);
  }
};

// ref: https://github.com/aws/aws-sdk-js-v3/issues/1877#issuecomment-755430937
const streamToString = async (stream: Readable): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
}
