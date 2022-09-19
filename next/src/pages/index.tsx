import type { NextPage } from 'next'
import Head from 'next/head'
import Events from 'components/Events';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from 'components/Header'
import { PrismaClient } from '@prisma/client';

const theme = createTheme();

const Home: NextPage = (events) => {
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
            <Events events={events} />
          </main>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export async function getServerSideProps() {
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
