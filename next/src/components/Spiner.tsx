import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spiner: React.FC = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: '100vh'}}
    >
      <CircularProgress color="info" size="5rem"/>
    </Box>
  );
};

export default Spiner
