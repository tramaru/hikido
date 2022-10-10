import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const eventData = [
  {
    title: '第1回 OSSコードリーディング会(テスト)',
  },
  {
    title: '第2回 OSSコードリーディング会(テスト)',
    audioUrl: 's3://amazon-transcribe-sample/1662270844167.ogg',
  },
  {
    title: '第3回 OSSコードリーディング会(テスト)',
    audioUrl: 'sample.ogg',
    transcriptUrl: 'sample.json',
    transcript:
      'Pundit を読むぞ。Machine learning is employed in a range of computing tasks where designing and programming explicit algorithms with good performance is difficult or infeasible. Example applications include email filtering, detection of network intruders and computer vision.',
  },
  {
    title: '録音テスト',
    transcript:
      'この声は聞こえていますでしょうか録音中ですこの声は聞こえていますでしょうか録音中です',
  },
  {
    title: '録音テスト2',
    transcript:
      'これ録音が始まっていますか。テストテスト。あとはリブすればいいですか。これで大丈夫大丈夫ですか。',
  },
  {
    title: '第4回 OSSコードリーディング会',
    transcript: 'えーとテストテストを聞こえてますか。',
  },
];

const insert = async () => {
  const titles = eventData.map((event) => event.title);

  const existedEvent = await prisma.event.findMany({
    where: {
      title: {
        in: titles
      }
    }
  })

  const existedEventTitles = existedEvent.map((event) => event.title);

  const newEvents = eventData.filter((event) => !existedEventTitles.includes(event.title));

  newEvents.forEach(async (event) => {
    await prisma.event.create({
      data: {
        title: event.title,
        audioUrl: event.audioUrl,
        transcriptUrl: event.transcriptUrl || "",
        transcript: event.transcript || "",
      }
    });
  });
};

const main = async () => {
  console.log(`Start seeding ...`);

  await insert();

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
