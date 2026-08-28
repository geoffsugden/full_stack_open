import { useContext } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import { UserContext } from '../context/userContext'
import useField from '../hooks/useField'

const LoginForm = () => {
  const { userLogin } = useContext(UserContext)
  const { reset: resetUsername, ...username } = useField({ id: 'name', label: 'name', type: 'text' })
  const { reset: resetPassword, ...password } = useField({ id: 'password', label: 'password', type: 'password' })

  const handlelogin = (event) => {
    event.preventDefault()

    userLogin({ username: username.value, password: password.value })

    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <Typography variant='h4' sx={{ py: 2 }}>
        Log in to the application
      </Typography>
      <form onSubmit={handlelogin} className='form-container'>
        <TextField {...username} variant='standard' />
        <TextField {...password} variant='standard' />
        <Button variant='contained' type='submit'>
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
