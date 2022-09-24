import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  eventId: number,
  setTranscript: Dispatch<SetStateAction<string | undefined>>,
  setButtonDisplay: Dispatch<SetStateAction<boolean>>,
  setErrorMessage: Dispatch<SetStateAction<boolean>>,
}

const TranscribeButton = (props: Props) => {
  return (
    <Button
      variant='contained'
      onClick={(e) => updateEventTranscript(e, props.eventId, props.setTranscript, props.setButtonDisplay, props.setErrorMessage)}
    >
      文字起こしをする
    </Button>
  );
}

const updateEventTranscript = async (
  _event: React.MouseEvent<HTMLElement>,
  eventId: number,
  setTranscript: Dispatch<SetStateAction<string | undefined>>,
  setButtonDisplay: Dispatch<SetStateAction<boolean>>,
  setErrorMessage: Dispatch<SetStateAction<boolean>>,
) => {
  const response = await fetch(`/api/events/${eventId}/transcript`, {
    method: 'PUT',
  });

  const { event } = await response.json();
  if (response.ok) {
    setTranscript(event.transcript)
    setButtonDisplay(false)
  } else {
    setButtonDisplay(false)
    setErrorMessage(true)
  }
}

export default TranscribeButton
