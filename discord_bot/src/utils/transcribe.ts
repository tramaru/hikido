import * as Dotenv from 'dotenv'
import {
  StartTranscriptionJobCommand,
  TranscribeClient,
} from '@aws-sdk/client-transcribe'

Dotenv.config()
const { S3_BUCKET, REGION } = process.env

if (!REGION || !S3_BUCKET) {
  console.error('Error: REGION が設定されていません！')
  process.exit(1)
}

const transcribeClient = new TranscribeClient({ region: REGION })

const generatedParams = (fileName: string, s3URL: string) => {
  return (
    {
      TranscriptionJobName: fileName,
      LanguageCode: 'ja-JP',
      MediaFormat: 'ogg',
      Media: {
        MediaFileUri: s3URL
      },
      OutputBucketName: S3_BUCKET,
    }
  )
}

export const transcribeRecordedOggFile = async (fileName: string, s3URL: string) => {
  const params = generatedParams(fileName, s3URL)

  try {
    const data = await transcribeClient.send(
      new StartTranscriptionJobCommand(params)
    )
    console.log(data.TranscriptionJob)
    return s3URL.replace(/ogg$/, 'json')
  } catch (err) {
    console.log('Error', err)
    return ''
  }
}
