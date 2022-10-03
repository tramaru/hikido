import fs from "node:fs"
import * as Dotenv from 'dotenv'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "node:path";
import { getFileDir } from "./file";
import { createEvent, EventElement } from "../model/event";

Dotenv.config()
const bucketName = process.env.S3_BUCKET
const region = process.env.REGION

if (!bucketName || !region) {
  console.error('Error: S3_BUCKET または、REGION が設定されていません！')
  process.exit(1)
}

const s3Client = new S3Client({ region })

export const uploadAudioFileToS3 = async (fileKey: string, fileName: string) => {
  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fs.createReadStream(fileName),
  };
  return await s3Client.send(new PutObjectCommand(params))
}

export const uploadRecordedOggFile = async (title: string) => {
  const now = Date.now()
  const fileKey = `${now}.ogg`
  const audioUrl = `s3://${bucketName}/${fileKey}`
  const recordedFile = path.resolve(getFileDir(import.meta.url), '../../recorded_outputs/result.ogg')
  const event: EventElement = { title, audioUrl, transcriptUrl: '', transcript: '' }

  try {
    await uploadAudioFileToS3(fileKey, recordedFile)
    await createEvent(event)
  } catch (error) {
    console.error(error)
  }
}
