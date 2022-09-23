import Alert from "@mui/material/Alert"

type Props = { errorDisplay: boolean }

export default function ErrorMessage(props: Props) {
  if (props.errorDisplay) {
    return (
      <Alert severity="error">エラーが起きました。時間を置いてから再度お試しください。</Alert>
    )
  } else {
    return null
  }
}
