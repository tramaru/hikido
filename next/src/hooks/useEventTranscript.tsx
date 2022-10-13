import { useState } from 'react';

const useEventTranscript = (id: number, initialTranscript: string | undefined): [string, () => void, boolean, boolean] => {
  const [transcript, setTranscript] = useState(initialTranscript ?? "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const refetch = async () => {
    setIsLoading(true)
    const response = await fetch(`/api/events/${id}/transcript`, {
      method: 'PUT',
    });

    const { event } = await response.json();
    if (response.ok) {
      setTranscript(event.transcript)
      setIsLoading(false)
    } else {
      setError(true)
      setIsLoading(false)
    }
  }

  return [transcript, refetch, error, isLoading]
}

export default useEventTranscript
