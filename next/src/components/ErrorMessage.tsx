import Alert from "@mui/material/Alert"

const ErrorMessage: React.FC = () => {
  return (
    <Alert severity='error'>
      エラーが起きました。時間を置いてから再度お試しください。
    </Alert>
  );
};

export default ErrorMessage
