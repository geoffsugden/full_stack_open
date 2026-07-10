import { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'
import noteService from '../services/notes'

const LoginForm = ({ onLoginSuccess, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      onLoginSuccess(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleLogin}>
          <div >
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
      </div>
    </div>
  )
}

export default LoginForm