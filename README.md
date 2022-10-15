# HIKIDO

HIKIDO は、会議中にメモが追いつかず、後から振り返れないという問題を解決するための
メモを気にせず議論に夢中になりたい人向けの文字起こしサービスです。

ユーザーは、Discord 上で会話を録音でき、録音したデータから文字起こしされた文章を生成し検索ができます。
Google Docs のように自分自身の音声のみを文字起こしするのとは違い、複数人の音声を文字起こしの対象にできるのが特徴です。

https://hikido.vercel.app/ にて実際に文字起こしされた文章を確認できます。

## 利用技術

Frontend
- TypeScript: 4.7.4
- React: 18.2.0 
- Next: 12.3.1
- Prisma: 4.2.1
- ESlint: 8.21.0
- MySQL: 8.0.30

Discord Bot
- TypeScript: 4.7.4
- Prisma: 4.2.1
- FFmpeg: 5.0.1
- MySQL: 8.0.30

## 本番環境

本番環境では以下のサービスを利用しています。
- Vercel
- RDS
- S3
- Transcribe
- Heroku
