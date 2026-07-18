import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography } from '@mui/material'
import login from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ onLoginSuccess, showMsg }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const handlelogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({ username, password })
      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      onLoginSuccess(user)
      navigate('/')
      setUsername('')
      setPassword('')
      showMsg({ msg: `Hello ${user.name} thankyou for using our humble application!`, msgType: 'success' })
    } catch (e) {
      showMsg({ msg: `Login failed due to ${e.response.data.error}`, msgType: 'error' })
      console.log('Incorrect Credentials', e)
    }
  }

  return (
    <div>
      <Typography variant='h4' sx={{ py: 2 }}>Log in to the application</Typography>
      <form onSubmit={handlelogin} className='form-container'>
        <TextField id='username' label='username' variant='standard' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField id='password' type='password' label='password' variant='standard' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant='contained' type='submit'>login</Button>
      </form>
    </div>
  )



}

export default LoginForm