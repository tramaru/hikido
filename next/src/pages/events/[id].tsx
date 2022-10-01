import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Header from 'components/Header'
import EventDetail from 'components/EventDetail';
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
    <div>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <Container maxWidth='lg'>
          <Header />
          <main>
            <EventDetail event={event}></EventDetail>
          </main>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apiUrl = process.env.API_BASE_URL || 'http://localhost:3000'

  const response = await fetch(`${apiUrl}/api/events`)
  const { events } = await response.json()
  const paths = events.map((event: Event) => `/events/${event.id}`)

  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const apiUrl = process.env.API_BASE_URL || 'http://localhost:3000'

  if (!params) { throw new Error('params is undefined') }

  const eventId = Number(params.id)
  const response = await fetch(`${apiUrl}/api/events?ids=${eventId}`)
  const { events } = await response.json()
  const event: Event = events[0]

  return {
    props: {
      event: event ?? {},
    }
  }
}

export default EventPage
