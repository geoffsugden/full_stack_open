import { Alert } from '@mui/material'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <Alert severity={message.msgType} sx={{ mt: 1 }}>
      {message.msg}
    </Alert>
  )
}

export default Notification
