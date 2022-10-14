import EventList from 'components/EventList';
import SearchForm from 'components/SearchForm';
import useSearchEvent from 'hooks/useSearchEvent';
import { Box, Typography } from '@mui/material';
import type { Event } from 'types/Event';
import type { GetServerSideProps, NextPage } from 'next'
import absoluteUrl from 'next-absolute-url';
import ErrorMessage from 'components/ErrorMessage';
import Spiner from 'components/Spiner';

const Home: NextPage<{ fetchedEvents: Event[], fetchedError: string }> = ({ fetchedEvents, fetchedError }) => {
  const [events, search, isLoading] = useSearchEvent(fetchedEvents)

  return (
    <div>
      <SearchForm onClick={search} />
      {isLoading && <Spiner />}
      {(!!fetchedError && !isLoading ) && (
        <Box mb={1.5} mt={1.5}>
          <ErrorMessage />
        </Box>
      )}
      {(events.length == 0 && !isLoading) && (
        <Typography component='h2' variant='h5' mt={6}>
          検索結果がありませんでした。
        </Typography>
      )}
      {(events.length > 0 && !isLoading) && <EventList events={events} />}
    </div>
  );
}

const getServerSideProps: GetServerSideProps = async (context) => {
  const { origin } = absoluteUrl(context.req)
  const response = await fetch(`${origin}/api/events`);
  const { events: fetchedEvents, error: fetchedError } = await response.json()

  return ({ props: { fetchedEvents, fetchedError } })
}

export { Home as default, getServerSideProps }
