import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header: React.FC = () => {
  return (
    <div>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          HIKIDO
        </Typography>
      </Toolbar>
    </div>
  );
}

export default Header
