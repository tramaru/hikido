import Typography from '@mui/material/Typography';

type Props = { transcript: string | undefined }

export default function Transcript(props: Props) {
  if (props.transcript !== undefined && props.transcript !== "") {
    return (
      <Typography variant='subtitle1' color='text.secondary'>
        {`${props.transcript.substr(0, 40)}...`}
      </Typography>
    )
  } else {
    return null
  }
}
