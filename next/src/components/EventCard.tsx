import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Transcript from 'components/Transcript'
import TranscribeButton from 'components/TranscribeButton';
import ErrorMessage from './ErrorMessage';
import type { Event } from 'types/Event';

type Props = { event: Event }

const EventCard = (props: Props) => {
  const [transcript, setTranscript] = useState(props.event.transcript)
  const [errorDisplay, setErrorDisplay] = useState(false)
  const isTranscript = (transcript === "" && !errorDisplay)

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
            <Box mt={1.5}>
              <Transcript transcript={transcript} />
            </Box>
            <Box mt={1.5}>
              { isTranscript && <TranscribeButton
                eventId={props.event.id}
                setTranscript={setTranscript}
                setErrorMessage={setErrorDisplay}
              /> }
            </Box>
            <Box mt={1.5}>
              <ErrorMessage errorDisplay={errorDisplay} />
            </Box>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

const formatDateTime = (dateTime: Date) => {
  const date = new Date(dateTime)
  return new Intl.DateTimeFormat("ja-jp", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export default EventCard