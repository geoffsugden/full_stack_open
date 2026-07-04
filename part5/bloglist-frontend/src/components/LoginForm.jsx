import { useState } from 'react'
import login from '../services/login'

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handlelogin = async event => {
    event.preventDefault()

    try {
      const user = await login({ username, password })

      onLoginSuccess(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('Incorrect Credentials', error)
    }
  }

  return (
    <form onSubmit={handlelogin}>
      <label>
        username
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        password
        <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type='submit'>login</button>
    </form>
  )



}

export default LoginForm