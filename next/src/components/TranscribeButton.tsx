import Button from '@mui/material/Button';

const TranscribeButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button variant='contained' onClick={onClick}>
      文字起こしをする
    </Button>
  );
};

export default TranscribeButton
