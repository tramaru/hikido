import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import TranscribeButton from 'components/TranscribeButton';

// MEMO:
//  ボタン表示の状態を持つ
//  テキスト表示状態を持つ

export default function Event(props) {
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component='a' href='#'>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant='subtitle1' color='text.secondary'>
              { props.event[1].createdAt }
            </Typography>
            <Typography component='h2' variant='h5'>
              { props.event[1].title }
            </Typography>
            <Box mt={1.5}>
              <TranscribeButton />
            </Box>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
