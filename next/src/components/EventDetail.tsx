import { formatDateTime } from 'utility/formatDateTime'
import type { Event } from 'types/Event'

const EventDetail: React.FC<{ event: Event }> = ( { event }) => {
  return (
    <div>
      <p>{formatDateTime(event.createdAt)}</p>
      <p>{event.title}</p>
      <p>{event.transcript}</p>
    </div>
  )
}

export default EventDetail
