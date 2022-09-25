import Typography from '@mui/material/Typography';

const Transcript: React.FC<{ transcript: string }> = ({ transcript }) => {
  return (
    <Typography variant='subtitle1' color='text.secondary'>
      {`${transcript.substr(0, 40)}...`}
    </Typography>
  )
}

export default Transcript
