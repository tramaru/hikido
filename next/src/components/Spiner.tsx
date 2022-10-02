import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Spiner: React.FC = () => {
  return (
    <Paper
      sx={{
        background: 'gray',
        height: '100vh',
        opacity: '0.5',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: "tooltip"
      }}
      square
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{ height: '100vh'}}
      >
        <CircularProgress color="info" size="5rem"/>
      </Box>
    </Paper>
  );
};

export default Spiner
