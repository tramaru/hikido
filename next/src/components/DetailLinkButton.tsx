
import Button from '@mui/material/Button'

const DetailLinkButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button variant="outlined" onClick={onClick}>
      詳細
    </Button>
  )
}

export default DetailLinkButton
