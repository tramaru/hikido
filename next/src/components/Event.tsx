import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import TranscribeButton from 'components/TranscribeButton';
import { EventProps } from 'types/EventProps';

// MEMO:
//  ボタン表示の状態を持つ
//  テキスト表示状態を持つ

type Props = { event: EventProps }

export default function Event(props: Props) {
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component='a' href='#'>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant='subtitle1' color='text.secondary'>
              { props.event.createdAt }
            </Typography>
            <Typography component='h2' variant='h5'>
              { props.event.title }
            </Typography>
            <Box mt={1.5}>
              { renderTranscript(props.event.transcript) }
            </Box>
            <Box mt={1.5}>
              { renderTranscribeButton(props.event.transcript, props.event.id) }
            </Box>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

const renderTranscript = (transcript: string | undefined) => {
  if (transcript !== undefined && transcript !== "") {
    return (
      <Typography variant='subtitle1' color='text.secondary'>
        {`${transcript.substr(0, 40)}...`}
      </Typography>
    )
  }
}

const renderTranscribeButton = (transcript: string | undefined, eventId: number) => {
  if (transcript === undefined || transcript === "") {
    return <TranscribeButton eventId={eventId} />
  }
}
