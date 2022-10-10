import EventList from 'components/EventList';
import SearchForm from 'components/SearchForm';
import useSearchEvent from 'hooks/useSearchEvent';
import { Typography } from '@mui/material';
import type { Event } from 'types/Event';
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [events, search] = useSearchEvent()

  return (
    <div>
      <SearchForm onClick={search} />
      {events.length == 0 && (
        <Typography component='h2' variant='h5' mt={6}>
          検索結果がありませんでした。
        </Typography>
      )}
      {events.length > 0 && <EventList events={events} />}
    </div>
  );
}

export default Home
