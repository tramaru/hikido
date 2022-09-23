import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { EventProps } from 'types/EventProps';
import Button from '@mui/material/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import Alert from '@mui/material/Alert';

type Props = { event: EventProps }

export default function Event(props: Props) {
  const [transcript, setTranscript] = useState(props.event.transcript)
  const [buttonDisplay, setButtonDisplay] = useState(transcript === "")
  const [errorDisplay, setErrorDisplay] = useState(false)

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component='a' href='#'>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant='subtitle1' color='text.secondary'>
              { formatDateTime(props.event.createdAt) }
            </Typography>
            <Typography component='h2' variant='h5'>
              {props.event.title}
            </Typography>
            <Box mt={1.5}>{renderTranscript(transcript)}</Box>
            <Box mt={1.5}>
              {renderTranscribeButton(
                props.event.id,
                buttonDisplay,
                setTranscript,
                setButtonDisplay,
                setErrorDisplay
              )}
            </Box>
            <Box mt={1.5}>{renderErrorMessage(errorDisplay)}</Box>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

const renderTranscript = (transcript: string | undefined) => {
  if (transcript !== undefined && transcript !== "") {
    return (
      <Typography variant='subtitle1' color='text.secondary'>
        {`${transcript.substr(0, 40)}...`}
      </Typography>
    )
  }
}

const renderTranscribeButton = (
  eventId: number,
  buttonDisplay: boolean,
  setTranscript: Dispatch<SetStateAction<string | undefined>>,
  setButtonDisplay: Dispatch<SetStateAction<boolean>>,
  setErrorMessage: Dispatch<SetStateAction<boolean>>,
) => {
  if (buttonDisplay) {
    return (
      <Button
        variant='contained'
        onClick={(e) => updateEventTranscript(e, eventId, setTranscript, setButtonDisplay, setErrorMessage)}
      >
        文字起こしをする
      </Button>
    );
  }
};

const renderErrorMessage = (errorDisplay: boolean) => {
  if (errorDisplay) {
    return (
      <Alert severity="error">エラーが起きました。時間を置いてから再度お試しください。</Alert>
    )
  }
}

const formatDateTime = (dateTime: Date) => {
  const date = new Date(dateTime)
  return new Intl.DateTimeFormat("ja-jp", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
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
};
