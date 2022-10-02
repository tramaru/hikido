import { formatDateTime } from 'utility/formatDateTime'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { Event } from 'types/Event'

const EventDetail: React.FC<{ event: Event }> = ( { event }) => {
  return (
    <Grid
      item
      xs={12}
      md={12}
    >
      <Typography variant="h5" gutterBottom>
        {formatDateTime(event.createdAt)}
      </Typography>
      <Typography variant="h3" gutterBottom>
        {event.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {event.transcript}
      </Typography>
    </Grid>
  )
}

export default EventDetail
