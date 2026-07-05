import { useState } from 'react'
import login from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handlelogin = async event => {
    event.preventDefault()

    try {
      const user = await login({ username, password })
      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      onLoginSuccess(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('Incorrect Credentials', error)
    }
  }

  return (
    <form onSubmit={handlelogin} className='form-container'>

        <label htmlFor='username'>username:</label>
        <input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor='password'>password:</label>
        <input id='password' type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type='submit'>login</button>
    </form>
  )



}

export default LoginForm