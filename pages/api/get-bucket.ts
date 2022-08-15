import fs from 'fs';
import { Readable } from 'stream';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'; // ES Modules import

const client = new S3Client({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: '', // アクセスキーを入れる
    secretAccessKey: '', // シークレットキーを入れる
  },
});

export default async function fetchBucket(): Promise<void> {
  try {
    const response = await client.send(
      new GetObjectCommand({
        Bucket: 'amazon-transcribe-sample',
        Key: 'cli-sample-transcription-job4.json',
      })
    )

    console.log('S3 バケットの取得完了')
    console.log(response.Body)

    const readableObj = response.Body as Readable;
    const writableObj = fs.createWriteStream('tmp/result.json');
    readableObj.pipe(writableObj);
  } catch (err) {
    console.log('Error', err);
  }
}

fetchBucket()
