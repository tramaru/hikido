import EventList from 'components/EventList';
import { useEffect, useState } from 'react'
import type { Event } from 'types/Event';
import type { NextPage } from 'next'
import SearchForm from 'components/SearchForm';

type Props = { events: Event[] }

const Home: NextPage<Props> = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const { events } = await response.json();
      setEvents(events);
    };
    fetchEvents();
  }, [])

  const search = async (keyword: string) => {
    const response = await fetch(`/api/events?q=${keyword}`);
    const { events } = await response.json();
    setEvents(events);
  }

  return (
    <div>
      <SearchForm onClick={search} />
      <EventList events={ events } />
    </div>
  );
}

export default Home
