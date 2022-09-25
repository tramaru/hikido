import { useState } from 'react';

const useEventTranscript = (id: number, initialTranscript: string | undefined): [string, () => void, boolean] => {
  const [transcript, setTranscript] = useState(initialTranscript ?? "")
  const [error, setError] = useState(false)

  const refetch = async () => {
    const response = await fetch(`/api/events/${id}/transcript`, {
      method: 'PUT',
    });

    const { event } = await response.json();
    if (response.ok) {
      setTranscript(event.transcript)
    } else {
      setError(true)
    }
  }

  return [transcript, refetch, error]
}

export default useEventTranscript
