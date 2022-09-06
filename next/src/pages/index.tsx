import type { NextPage } from 'next'
import Head from 'next/head'
import Events from 'components/Events';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from 'components/Header'

const theme = createTheme();

const Home: NextPage = () => {
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
            <Events />
          </main>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Home
