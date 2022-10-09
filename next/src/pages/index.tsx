import EventList from 'components/EventList';
import { useEffect, useState } from 'react'
import type { Event } from 'types/Event';
import type { NextPage } from 'next'
import SearchForm from 'components/SearchForm';

type Props = { events: Event[] }

const Home: NextPage<Props> = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchEvents = async () => {
      let targetUrl = "/api/events"
      if (query !== "") { targetUrl = `/api/events?q=${query}` }

      const response = await fetch(targetUrl);
      const { events } = await response.json();
      setEvents(events);
    };
    fetchEvents();
  }, [query])

  const search = () => {
    // saeach
    // setEvent

  }

  return (
    <div>
      <SearchForm onClick={search}></SearchForm>
      <EventList events={ events } />
    </div>
  );
}

export default Home
