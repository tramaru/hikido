import { useEffect, useState } from 'react';
import type { Event } from 'types/Event'

const useSearchEvent = (): [Event[] | [], (keyword: string) => void] => {
  const [events, setEvents] = useState<Event[] | []>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events');
      const { events } = await response.json();
      setEvents(events);
    };
    fetchEvents();
  }, []);

  const search = async (keyword: string) => {
    const response = await fetch(`/api/events?q=${keyword}`);
    const { events } = await response.json();
    setEvents(events);
  };

  return [events, search];
};

export default useSearchEvent;
