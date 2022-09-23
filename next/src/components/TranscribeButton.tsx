import Button from '@mui/material/Button';

export default function TranscribeButton(props: Props) {
  return (
    <Button variant="contained" onClick={props.onClick}>
      Transcribe
    </Button>
  );
}
