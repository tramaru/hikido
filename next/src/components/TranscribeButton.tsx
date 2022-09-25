import Button from '@mui/material/Button';

type Props = {
  onClick: () => void;
};

const TranscribeButton = (props: Props) => {
  return (
    <Button
      variant='contained'
      onClick={props.onClick}
    >
      文字起こしをする
    </Button>
  );
}

export default TranscribeButton
