import { useState } from 'react';

const useEventTranscript = (id: number, initialTranscript: string | undefined): [string, () => void] => {
  const [transcript, setTranscript] = useState(initialTranscript ?? "")

  const refetch = async () => {
    const response = await fetch(`/api/events/${id}/transcript`, {
      method: 'PUT',
    });

    const { event } = await response.json();
    if (response.ok) {
      setTranscript(event.transcript)
    } else {
      // TODO: エラーを返す
    }
  }

  return [transcript, refetch]
}

export default useEventTranscript
