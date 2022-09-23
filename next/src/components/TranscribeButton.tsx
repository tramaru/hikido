import Button from '@mui/material/Button';

export default function TranscribeButton() {
  return (
    <Button onClick={(e) => updateEventTranscript(e, props.eventId) } variant='contained'>文字起こしする</Button>
  )
}

const updateEventTranscript = async (event: React.MouseEvent<HTMLElement>, eventId: number) => {
  const response = await fetch(`/api/events/${eventId}/transcript`, {
    method: 'PUT',
  })

  const { data, errors } = await response.json()
  if (!response.ok) {
    // TODO: エラー時の処理を追加
    console.log('Error', errors)
  }
}

export default TranscribeButton
