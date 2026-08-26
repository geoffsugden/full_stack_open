import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageContext } from './MessageContext'
import blogService from '../services/blogs'
import { getUser, removeUser, saveUser } from '../services/persistentUser'
import login from '../services/login'

export const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const { displayMessage } = useContext(MessageContext)

  useEffect(() => {
    const loggedUserJSON = getUser()
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [setUser])

  const userLogin = async ({ username, password }) => {
    try {
      const user = await login({ username, password })
      saveUser(user)
      blogService.setToken(user.token)
      setUser(user)
      displayMessage(
        { msg: `Hello ${user.name} thankyou for using our humble application!`, msgType: 'success' },
        10_000
      )
      navigate('/')
    } catch (e) {
      console.log('Incorrect Credentials', e)
      displayMessage({ msg: `Login failed due to ${e.response.data.error}`, msgType: 'error' })
    }
  }

  const userLogout = () => {
    setUser(null)
    removeUser()
    navigate('/')
    displayMessage({ msg: 'You have been logged out', msgType: 'success' })
  }

  return <UserContext value={{ user, setUser, userLogin, userLogout }}>{props.children}</UserContext>
}
