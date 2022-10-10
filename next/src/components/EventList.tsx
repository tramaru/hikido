import EventCard from 'components/EventCard';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import type { Event } from 'types/Event';

const EventList: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      <Divider />
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Grid>
  );
};

export default EventList
