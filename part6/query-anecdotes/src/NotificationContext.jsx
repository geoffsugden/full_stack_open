import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState('')
  return (
    <NotificationContext.Provider value={{ notification, setNotification}}>
      {props.children}
    </NotificationContext.Provider>
  )
}