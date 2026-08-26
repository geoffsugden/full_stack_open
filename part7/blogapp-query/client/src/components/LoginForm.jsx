import { useContext, useState } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import { UserContext } from '../context/userContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { userLogin } = useContext(UserContext)

  const handlelogin = (event) => {
    event.preventDefault()

    userLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <Typography variant='h4' sx={{ py: 2 }}>
        Log in to the application
      </Typography>
      <form onSubmit={handlelogin} className='form-container'>
        <TextField
          id='username'
          label='username'
          variant='standard'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id='password'
          type='password'
          label='password'
          variant='standard'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant='contained' type='submit'>
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
