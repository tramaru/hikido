import Head from 'next/head'
import EventList from 'components/EventList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from 'components/Header'
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from "next";
import type { Event } from 'types/Event';
import type { NextPage } from 'next'

const theme = createTheme();

type Props = { events: Event[] }

const Home: NextPage<Props> = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header />
        <main>
          <EventList events={ props.events } />
        </main>
      </Container>
    </ThemeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const selectedEvents = await prisma.event.findMany();
  const events = JSON.parse(JSON.stringify(selectedEvents));
  return {
    props: {
      events,
    }
  }
}

export default Home
