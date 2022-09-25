import Button from '@mui/material/Button';

type Props = {
  onClick: () => void;
};

const TranscribeButton = (props: Props) => {
  return (
    <Button
      variant='contained'
      onClick={props.onClick}
    >
      文字起こしをする
    </Button>
  );
}

// const updateEventTranscript = async (
//   _event: React.MouseEvent<HTMLElement>,
//   eventId: number,
//   setTranscript: Dispatch<SetStateAction<string | undefined>>,
//   setErrorMessage: Dispatch<SetStateAction<boolean>>,
// ) => {
//   const response = await fetch(`/api/events/${eventId}/transcript`, {
//     method: 'PUT',
//   });

//   const { event } = await response.json();
//   if (response.ok) {
//     setTranscript(event.transcript)
//   } else {
//     setErrorMessage(true)
//   }
// }

export default TranscribeButton
