import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { EventProps } from 'types/EventProps';
import Button from '@mui/material/Button';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = { event: EventProps }

export default function Event(props: Props) {
  const [transcript, setTranscript] = useState(props.event.transcript)
  const [_buttonDisplay, setButtonDisplay] = useState(transcript === "")

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component='a' href='#'>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant='subtitle1' color='text.secondary'>
              { props.event.createdAt }
            </Typography>
            <Typography component='h2' variant='h5'>
              { props.event.title }
            </Typography>
            <Box mt={1.5}>
              { renderTranscript(transcript) }
            </Box>
            <Box mt={1.5}>
              {
                renderTranscribeButton(
                  props.event.id,
                  transcript,
                  setTranscript,
                  setButtonDisplay,
                )
              }
            </Box>
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
  transcript: string | undefined,
  setTranscript: Dispatch<SetStateAction<string | undefined>>,
  setButtonDisplay: Dispatch<SetStateAction<boolean>>,
) => {
  if (transcript === "" || transcript === undefined) {
    return (
      <Button
        variant='contained'
        onClick={(e) => updateEventTranscript(e, eventId, setTranscript, setButtonDisplay)}
      >
        文字起こしをする
      </Button>
    );
  }
};

const updateEventTranscript = async (
  _event: React.MouseEvent<HTMLElement>,
  eventId: number,
  setTranscript: Dispatch<SetStateAction<string | undefined>>,
  setButtonDisplay: Dispatch<SetStateAction<boolean>>,
) => {
  const response = await fetch(`/api/events/${eventId}/transcript`, {
    method: 'PUT',
  });

  const { event, error } = await response.json();
  if (response.ok) {
    setTranscript(event.transcript)
    setButtonDisplay(false)
  } else {
    // TODO: エラー時の処理を追加
    console.log('Error', error);
  }
};
