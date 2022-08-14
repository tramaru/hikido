

import type { NextApiRequest, NextApiResponse } from 'next'

import {
  StartTranscriptionJobCommand,
  TranscribeClient,
} from '@aws-sdk/client-transcribe';

const REGION = 'ap-northeast-1'; //e.g. "us-east-1"

// Create an Amazon Transcribe service client object.
const transcribeClient = new TranscribeClient({
  region: REGION,
  credentials: {
  accessKeyId: '', // アクセスキーを入れる
  secretAccessKey: '', // アクセスキーを入れる
}, });

// Set the parameters
export const params = {
  TranscriptionJobName: 'cli-sample-transcription-job4',
  LanguageCode: 'en-US', // For example, 'en-US'
  MediaFormat: 'mp3', // For example, 'wav'
  Media: {
    MediaFileUri:
      's3://amazon-transcribe-sample/transcribe-sample.5fc2109bb28268d10fbc677e64b7e59256783d3c.mp3' // kohei 個人のサ S3 にあるサンプル
    // For example, "https://transcribe-demo.s3-REGION.amazonaws.com/hello_world.wav"
  },
  OutputBucketName: 'amazon-transcribe-sample',
};

export default async function run(req: NextApiRequest, res:NextApiResponse): Promise<void> {
  try {
    const data = await transcribeClient.send(
      new StartTranscriptionJobCommand(params)
    );
    console.log("Transcription job created, the details:");
    console.log(data.TranscriptionJob);
    res.status(200).json(data);
  } catch (err) {
    console.log('Error', err);
  }
};
