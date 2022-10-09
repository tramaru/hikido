import TextField from '@mui/material/TextField'
import { useState } from 'react';
import { KeyboardEvent } from 'react';
import Grid from '@mui/material/Grid';

type Search = (query: string) => void

const SearchForm: React.FC<{ onClick: Search }> = ({ onClick}) => {
  const [query, setQuery] = useState("")

  const fireSearchWhenPressedEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick(query);
    }
  };

  return (
    <Grid container sx={{ width: "30%", mx: 'auto', mt: 2 }}>
      <Grid item xs={12}>
        <TextField
          label="Search"
          color="primary"
          variant='outlined'
          InputProps={{
            type: 'search',
          }}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={(e) => {
            fireSearchWhenPressedEnter(e);
          }}
          sx={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}

export default SearchForm
