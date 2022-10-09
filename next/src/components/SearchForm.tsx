import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { KeyboardEvent } from 'react';

type Search = (query: string) => void

const SearchForm: React.FC<{ onClick: Search }> = ({ onClick}) => {
  const [query, setQuery] = useState("")
  const isDisabled = (query === "")

  const fireSearchWhenPressedEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick(query);
    }
  };

  return (
    <Grid>
      <TextField
        label='Filled'
        color='info'
        variant='filled'
        InputProps={{
          type: 'search',
        }}
        sx={{ backgroundColor: 'white' }}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyPress={(e) => {
          fireSearchWhenPressedEnter(e);
        }}
      />
      <Button
        disabled={isDisabled}
        onClick={() => {
          onClick(query);
        }}
      >
        <SearchIcon />
      </Button>
    </Grid>
  );
}

export default SearchForm
