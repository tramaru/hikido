import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header from 'components/Header'
import EventDetail from 'components/EventDetail';
import { PrismaClient } from '@prisma/client';
import type { Event } from 'types/Event'
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
  const foundEvents = await prisma.event.findMany();
  const events = JSON.parse(JSON.stringify(foundEvents));
  const paths = events.map((event: Event) => `/events/${event.id}`)

  return { paths, fallback: true }
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
  const event = JSON.parse(JSON.stringify(foundEvent));

  return {
    props: {
      event: event,
    }
  }
}

export default EventPage
