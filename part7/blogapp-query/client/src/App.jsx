import { useState, useEffect, useContext } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import NewBlogForm from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notifications'
import blogService from './services/blogs'
import ErrorBoundary from './components/ErrorBoundary'
import Error404 from './components/Error404'
import { MessageContext } from './MessageContext'

const App = () => {
  const [user, setUser] = useState(null)
  const { displayMessage } = useContext(MessageContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const navigate = useNavigate()

  const handleLogout = (event) => {
    if (event) {
      event.preventDefault()
    }
    setUser(null)
    localStorage.removeItem('loggedBlogListUser')
    navigate('/')
    displayMessage({ msg: 'You have been logged out', msgType: 'success' })
  }

  const buttonStyle = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color='inherit' component={Link} to='/' sx={buttonStyle}>
            Blogs
          </Button>
          {user && (
            <Button color='inherit' variant='text' component={Link} to='/newblog' sx={buttonStyle}>
              New Blog
            </Button>
          )}
          {!user && (
            <Button color='inherit' variant='text' component={Link} to='/login' sx={buttonStyle}>
              Login
            </Button>
          )}
          {user && (
            <Button color='inherit' variant='text' onClick={handleLogout} sx={buttonStyle}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <ErrorBoundary>
        <Notification />
      </ErrorBoundary>
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<BlogList user={user} />} />
          <Route path='/blogs/:id' element={<Blog loggedInUser={user} />} />
          <Route path='/newblog' element={user && <NewBlogForm />} />
          <Route path='/login' element={<LoginForm onLoginSuccess={setUser} />} />
          <Route path='/*' element={<Error404 />} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
