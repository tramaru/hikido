import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Transcript from 'components/Transcript'
import TranscribeButton from 'components/TranscribeButton';
import ErrorMessage from './ErrorMessage';
import useEventTranscript from 'hooks/useEventTranscript'
import { formatDateTime } from 'utility/formatDateTime'
import type { Event } from 'types/Event';

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [transcript, refetch, error] = useEventTranscript(
    event.id,
    event.transcript
  );

  const isTranscript = transcript !== '';

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component='a' href='#'>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant='subtitle1' color='text.secondary'>
              {formatDateTime(event.createdAt)}
            </Typography>
            <Typography component='h2' variant='h5'>
              {event.title}
            </Typography>
            <Box mt={1.5}>
              {isTranscript && <Transcript transcript={transcript} />}
            </Box>
            <Box mt={1.5}>
              {!isTranscript && <TranscribeButton onClick={refetch} />}
            </Box>
            <Box mt={1.5}>{error && <ErrorMessage />}</Box>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default EventCard
