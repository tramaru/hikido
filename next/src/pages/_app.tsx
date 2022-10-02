import '../styles/globals.css'
import Spiner from 'components/Spiner'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false)

 useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && setPageLoading(true)
    const handleComplete = () => setPageLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (<div>
    {pageLoading && <Spiner />}
    <Component {...pageProps} />
  </div>)
}

export default MyApp
