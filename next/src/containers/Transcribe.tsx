import TranscribeButton from 'components/TranscribeButton'
import useTranscript from 'hooks/useTranscript'

type Props = {
  eventId: number
  buttonDisplay: boolean
}

export default function Transcribe(props: Props) {
  const updateTranscript = useTranscript(props.eventId)

  if (props.buttonDisplay) {
    return (
      <TranscribeButton onClick={updateTranscript} />
    );
  } else {
    return null
  }
}
