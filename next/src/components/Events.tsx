import Header from 'components/Header'
import SearchForm from 'components/SearchForm' // TODO: 「全文検索機能」実装時に実装する」
import Event from 'components/Event';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

export default function Events() {
  return (
    <Grid container spacing={2}>
      <Divider />
      {[1,2,3].map((index) => (
        <Event key={index} />
      ))}
    </Grid>
  );
}
