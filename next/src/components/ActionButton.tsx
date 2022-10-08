import Button from '@mui/material/Button'

const DetailLinkButton: React.FC<{
  onClick: () => void
  variant: 'text' | 'outlined' | 'contained' | undefined
  text: string
}> = ({ onClick, variant, text}) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {text}
    </Button>
  )
}

export default DetailLinkButton
