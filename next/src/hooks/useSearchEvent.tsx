import { useState } from 'react';
import type { Event } from 'types/Event'

const useSearchEvent = (initialEvents: Event[]): [Event[] | [], (keyword: string) => void, boolean] => {
  const [events, setEvents] = useState<Event[] | []>(initialEvents);
  const [isLoading, setIsLoading] = useState(false)

  const search = async (keyword: string) => {
    setIsLoading(true)
    const response = await fetch(`/api/events?q=${keyword}`);
    const { events } = await response.json();
    setEvents(events);
    setIsLoading(false)
  };

  return [events, search, isLoading];
};

export default useSearchEvent;
