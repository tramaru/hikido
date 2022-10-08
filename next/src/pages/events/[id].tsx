import Head from 'next/head'
import Container from '@mui/material/Container';
import EventDetail from 'components/EventDetail';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PrismaClient } from '@prisma/client';
import Header from 'components/Header'

import type {
  NextPage,
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next';

type EventPageProps = InferGetStaticPropsType<typeof getStaticProps>
const theme = createTheme();

const EventPage: NextPage<EventPageProps> = (
  {
    event,
  }: EventPageProps
) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <Container maxWidth='lg'>
        <Header />
        <main>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {event && <EventDetail event={event} />}
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient();
  const results = await prisma.event.findMany({
    select: {
      id: true
    }
  });
  await prisma.$disconnect();
  const paths = results.map((result: { id: number }) => `/events/${result.id}`)

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) { throw new Error('params is undefined') }

  const eventId = Number(params.id)
  const prisma = new PrismaClient();
  const foundEvent = await prisma.event.findUnique({
    where: {
      id: eventId
    }
  })
  await prisma.$disconnect();
  const event = JSON.parse(JSON.stringify(foundEvent));

  return {
    props: {
      event: event,
    }
  }
}

export default EventPage
