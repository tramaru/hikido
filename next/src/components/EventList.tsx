import EventCard from 'components/EventCard';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import type { Event } from 'types/Event';

type Props = { events: Event[] }

const EventList = (props: Props) => {
  return (
    <Grid container spacing={2}>
      <Divider />
      {props.events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Grid>
  );
}

export default EventList
