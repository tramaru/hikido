import type { NextPage } from 'next'
import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from 'components/Header'
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from "next";
import { EventProps } from 'types/EventProps';
import Event from 'containers/Event';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const theme = createTheme();

type Props = { events: EventProps[] }

const Home: NextPage<Props> = (props: Props) => {
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
            <Grid container spacing={2}>
              <Divider />
              <Grid container spacing={2}>
                <Divider />
                {props.events.map((event, _i) => (
                  <Event key={event.id} event={event} />
                ))}
              </Grid>
            </Grid>
          </main>
        </Container>
      </ThemeProvider>
    </div>
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

export default Home;
