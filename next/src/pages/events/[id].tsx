import Box from '@mui/material/Box';
import ErrorMessage from 'components/ErrorMessage';
import EventDetail from 'components/EventDetail';
import Grid from '@mui/material/Grid';

import type { NextPage } from 'next';
import type { Event } from 'types/Event';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EventPage: NextPage = () => {
  const [event, setEvent] = useState<Event | undefined>()
  const [error, setError] = useState<boolean>()
  const router = useRouter()
  const { id: eventId } = router.query

  useEffect(() => {
    if (!eventId) return
    const fetchEvent = async () => {
      const response = await fetch(`/api/events/${eventId}`)
      const { event: fetchedEvent, error: fetchedError } = await response.json()
      setError(!!fetchedError)
      setEvent(fetchedEvent)
    }

    fetchEvent()
  }, [eventId])

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {error && (
        <Box mb={1.5}>
          <ErrorMessage />
        </Box>
      )}
      {event && <EventDetail event={event} />}
    </Grid>
  );
}

export default EventPage
