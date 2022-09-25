import Head from 'next/head'
import EventList from 'components/EventList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from 'components/Header'
// import { PrismaClient } from '@prisma/client';
// import { GetServerSideProps } from "next";
// import type { Event } from 'types/Event';
import type { NextPage } from 'next'

const theme = createTheme();

const Home: NextPage = () => {
  const events = [
    {
      id: 1,
      title: '第1回 OSSコードリーディング会(テスト)',
      audioUrl: "",
      transcriptUrl: "",
      transcript: "",
      createdAt: "2021-09-01T00:00:00.000Z",
      updatedAt: "2021-09-01T00:00:00.000Z",

    },
    {
      id: 2,
      title: '第2回 OSSコードリーディング会(テスト)',
      audioUrl: "s3://amazon-transcribe-sample/1662270844167.ogg",
      transcriptUrl: "",
      transcript: "",
      createdAt: "2021-09-01T00:00:00.000Z",
      updatedAt: "2021-09-01T00:00:00.000Z",
    },
    {
      id: 3,
      title: '第3回 OSSコードリーディング会(テスト)',
      audioUrl: "sample.ogg",
      transcriptUrl: "sample.json",
      transcript: "Pundit を読むぞ。Machine learning is employed in a range of computing tasks where designing and programming explicit algorithms with good performance is difficult or infeasible. Example applications include email filtering, detection of network intruders and computer vision.",
      createdAt: "2021-09-01T00:00:00.000Z",
      updatedAt: "2021-09-01T00:00:00.000Z",
    },
  ];

  return (
    <div>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Header />
          <main>
            <EventList events={ events } />
          </main>
        </Container>
      </ThemeProvider>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const prisma = new PrismaClient();
//   const selectedEvents = await prisma.event.findMany();
//   const events = JSON.parse(JSON.stringify(selectedEvents));
//   return {
//     props: {
//       events,
//     }
//   }
// }

export default Home
