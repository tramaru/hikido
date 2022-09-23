import { Dispatch, SetStateAction } from 'react';

type Display = {
  buttonDisplay: boolean
  transcript: string | null
  errorMessageDisplay: boolean
}

// これは結局 onClick に渡したいから、オブジェクト返してはいけない
export default async function useTranscript(
  eventId: number,
): Promise<Display> {
  const response = await fetch(`/api/events/${eventId}/transcript`, {
    method: 'PUT',
  });

  const { event } = await response.json();
  if (response.ok) {
    return {
      buttonDisplay: false,
      transcript: event.transcript,
      errorMessageDisplay: false
    }
  } else {
    return {
      buttonDisplay: false,
      transcript: null,
      errorMessageDisplay: true
    }
  }
}
