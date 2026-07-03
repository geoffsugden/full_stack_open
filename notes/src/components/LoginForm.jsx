import { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'
import noteService from '../services/notes'

/* eslint-disable react/prop-types */
const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      onLoginSuccess(user)
      noteService.setToken(user.token)

      setUsername('')
      setPassword('')
    } catch {
      setLoginError('wrong credentials')
      setTimeout(() => {setLoginError(null)}, 5000)
    }
    
  }
  return (
    <form onSubmit={handleLogin}> 
        <div>
          <Notification message={loginError} />
          <label>
            username
            <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
          </label>
        </div>
        <div>
          <label>
            password
            <input type="text" value={password} onChange={({ target }) => setPassword(target.value)} />
          </label>
        </div>
        <button type="submit">login</button>
      </form>     
  )
}

export default LoginForm