import Event from 'components/Event';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { EventProps } from 'types/EventProps';

type Props = { events: EventProps[] }

const Events = (props: Props) => {
  return (
    <Grid container spacing={2}>
      <Divider />
      {props.events.map((event, _i) => (
        <Event key={event.id} event={event} />
      ))}
    </Grid>
  );
}

export default Events
