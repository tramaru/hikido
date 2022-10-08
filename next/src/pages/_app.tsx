import '../styles/globals.css'
import { useRouter } from "next/router"
import Spiner from 'components/Spiner'
import useLoading from 'hooks/useLoading'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from 'components/Header'

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isLoading = useLoading(router)
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header />
        <main>
          {isLoading && <Spiner />}
          {!isLoading && <Component {...pageProps} />}
        </main>
      </Container>
    </ThemeProvider>
  )
}

export default MyApp
