import Box from '@mui/material/Box';
import ErrorMessage from 'components/ErrorMessage';
import EventDetail from 'components/EventDetail';
import Grid from '@mui/material/Grid';

import type { GetServerSideProps, NextPage } from 'next';
import type { Event } from 'types/Event';
import absoluteUrl from 'next-absolute-url';

const EventPage: NextPage<{ event: Event, error: string }> = ({ event, error }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {!!error && (
        <Box mb={1.5}>
          <ErrorMessage />
        </Box>
      )}
      {event && <EventDetail event={event} />}
    </Grid>
  );
}

const getServerSideProps: GetServerSideProps = async (context) => {
  const { origin } = absoluteUrl(context.req)
  const { id } = context.query
  const response = await fetch(`${origin}/api/events/${id}`);
  const { event, error } = await response.json()

  return ({ props: { event, error } })
}

export { EventPage as default, getServerSideProps }
