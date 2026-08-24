import { Alert } from '@mui/material'
import { useContext } from 'react'
import { MessageContext } from '../MessageContext'

const Notification = () => {
  const { message } = useContext(MessageContext)

  const { msg, msgType } = message

  if (msg === null) {
    return null
  }

  return (
    <Alert severity={msgType} sx={{ mt: 1 }}>
      {msg}
    </Alert>
  )
}

export default Notification
