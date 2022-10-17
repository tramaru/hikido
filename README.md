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
- Amazon RDS
- Amazon S3
- Amazon Transcribe
- Heroku

![HIKIDO-Infrastructure](https://user-images.githubusercontent.com/45173523/195976153-417f43b9-55b4-4993-800e-93f6832c96ee.png)

## 環境構築

### 事前準備
- Amazon S3 にて、HIKIDO で利用するようのバケットを作成してください
- 利用する IAM の権限に S3 と Amazon Transcribe が含まれていることを確認してください
- S3 を利用するために AWS CLI の設定をしてください
  - [AWS CLI に関して](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config)

### HIKIDO App (Next.js)
- `.env` 内の環境変数を設定してください
  - AWS CLI を設定した際に利用した下記の情報を取得してください
    - HIKIDO_AWS_ACCESS_KEY_ID
    - HIKIDO_AWS_SECRET_ACCESS_KEY
  - AWS S3 から下記の情報を取得してください
    - HIKIDO_S3_BUCKET
- Docker 利用します
```
% docker-compose build
% docker-compose up
```
- yarn install してください
```
% docker-compose run --rm next yarn install
```
- コンテナ上の MySQL にアクセスして`hikido_development`という database を作ってください
- マイグレーションを行ってください
```
% docker-compose run --rm next yarn prisma migrate dev
```

### HIKIDO Bot
- [Homebrew](https://brew.sh/) を利用して、ffmpeg をインストールしてください
  - https://formulae.brew.sh/formula/ffmpeg
- Discord Bot をギルド(Discord Server) に追加してください
  - [Discord Bot に関して](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- `.env` ファイルを作成してください
```console
% cd discord_bot
% cp .env{.sample,}
```
- `.env` 内の環境変数を設定してください
  - [Developer Portal](https://discord.com/developers/applications) から下記の情報を取得してください
    - DISCORD_TOKEN
    - CLIENT_ID
  - 参加しているギルド(Discord Server) から下記の情報を取得してください
    - GUILD_ID
  - AWS S3 から下記の情報を取得してください
    - S3_BUCKET
    - REGION
- `yarn install` してください
```console
% yarn install
```
- HIKIDO Bot を起動してください
```console
% tsc
% yarn start
```
- Discrod 側でやれること
  - スラッシュコマンドを登録してください 
    - 任意のチャット欄で`!deploy` と入力すると登録されます
  - 任意のボイスチャンネルに入ってください
    - `/join` で、ボットを参加したチャンネルに参加させてください
  - `/record speaker: ユーザーを指定する` で、音声の対象者を指定して音声の録音をさせてください
    - なんでも良いので少ししゃべてください 
  - `/leave` で、ボットをチャンネルから離脱させてください
  - `/upload event-title: イベント名を指定する` で、録音した音声を対象の S3 のバケットにアップロードします
