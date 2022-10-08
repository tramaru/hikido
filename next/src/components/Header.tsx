import Typography from '@mui/material/Typography';

const Header: React.FC = () => {
  return (
    <Typography
      component="h1"
      variant="h3"
      color="inherit"
      align="left"
      noWrap
      sx={{ mt: 2 }}
    >
      HIKIDO
    </Typography>
  );
}

export default Header
