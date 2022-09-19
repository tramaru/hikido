import Header from 'components/Header'
import Event from 'components/Event';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

export default function Events(props) {
  return (
    <Grid container spacing={2}>
      <Divider />
      {Object.entries(props.events.events).map((event, index) => (
        <Event key={index} event={event} />
      ))}
    </Grid>
  );
}
