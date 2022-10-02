import '../styles/globals.css'
import Spiner from 'components/Spiner'
import { useRouter } from "next/router"
import useLoading from 'hooks/useLoading'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isLoading = useLoading(router)
  return (<div>
    {isLoading && <Spiner />}
    <Component {...pageProps} />
  </div>)
}

export default MyApp
