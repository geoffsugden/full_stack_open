import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const useNotify = () => useContext(NotificationContext)

export default useNotify