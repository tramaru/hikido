import Header from 'components/Header'
import Event from 'components/Event';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

export default function Events() {
  return (
    <Grid container spacing={2}>
      <Divider />
      {[1,2,3].map((index) => (
        <Event key={index} />
      ))}
    </Grid>
  );
}
