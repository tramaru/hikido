import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ActionButton from 'components/ActionButton'
import ErrorMessage from './ErrorMessage';
import Grid from '@mui/material/Grid';
import Transcript from 'components/Transcript'
import Typography from '@mui/material/Typography';
import useEventTranscript from 'hooks/useEventTranscript'
import { formatDateTime } from 'utility/formatDateTime'
import { useRouter } from 'next/router';

import type { Event } from 'types/Event';

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [transcript, refetch, error] = useEventTranscript(
    event.id,
    event.transcript
  );
  const isTranscript = transcript !== '';

  const router = useRouter();
  const eventDetailLink = () => {
    return () => {
      router.push(`/events/${event.id}`);
    };
  }

  return (
    <Grid item xs={12} md={6}>
      <Card variant='outlined' sx={{ display: 'flex', height: '12.5rem' }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant='subtitle1' color='text.secondary'>
            {formatDateTime(event.createdAt)}
          </Typography>
          <Typography component='h2' variant='h5' mb={1.5}>
            {event.title}
          </Typography>
          {isTranscript && (
            <Box mb={1.5}>
              <Transcript transcript={transcript} />
            </Box>
          )}
          {!isTranscript && (
            <Box mb={1.5}>
              <ActionButton onClick={refetch} variant="contained" text="文字起こしする" />
            </Box>
          )}
          {isTranscript && (
            <Box mb={1.5}>
              <ActionButton onClick={eventDetailLink()} variant="outlined" text="詳細" />
            </Box>
          )}
          {error && (
            <Box mb={1.5}>
              <ErrorMessage />
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EventCard
