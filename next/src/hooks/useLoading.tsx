import { useState, useEffect, useCallback } from 'react'
import type { NextRouter } from 'next/router'

const useLoading = (router: NextRouter) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleStart = useCallback((url: string) => url !== router.asPath && setIsLoading(true), [router.asPath])
  const handleComplete = useCallback(() => setIsLoading(false), [])

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
  }, [handleComplete, handleStart, router.events])
  return isLoading
}

export default useLoading
