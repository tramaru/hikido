import { TextField } from '@mui/material'

const SearchForm: React.FC<{
  onClick: () => void
}> = ({ onClick}) => {
  return (
    <TextField
      label='Filled'
      color="info"
      variant='filled'
      InputProps={{
        type: 'search',
      }}
      sx={{ backgroundColor: 'white'} }
    />
  );
}

export default SearchForm
