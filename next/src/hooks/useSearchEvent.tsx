import { useState } from 'react';
import type { Event } from 'types/Event'

const useSearchEvent = (initialEvents: Event[]): [Event[] | [], (keyword: string) => void] => {
  const [events, setEvents] = useState<Event[] | []>(initialEvents);

  const search = async (keyword: string) => {
    const response = await fetch(`/api/events?q=${keyword}`);
    const { events } = await response.json();
    setEvents(events);
  };

  return [events, search];
};

export default useSearchEvent;
