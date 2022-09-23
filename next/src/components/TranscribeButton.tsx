import Button from '@mui/material/Button';

// MEMO:
// ボタン活性化の状態を持つ
// エラーメッセージの状態を持つ

type Props = { eventId: number }

const TranscribeButton = (props: Props) => {
  return (
    <Button variant='contained' onClick={(event) => updateEventTranscript(event, props.eventId)}>
      文字起こしをする
    </Button>
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
