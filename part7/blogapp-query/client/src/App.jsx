import { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import NewBlogForm from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notifications'
import ErrorBoundary from './components/ErrorBoundary'
import Error404 from './components/Error404'
import { UserContext } from './context/userContext'

const App = () => {
  const { user, userLogout } = useContext(UserContext)
  const theme = createTheme({
    palette: { primary: { main: '#2e7d32' } },
    typography: {
      h1: { fontSize: '2.5rem', fontWeight: 700 },
      h2: { fontSize: '2rem', fontWeight: 700, color: '#bd9520' },
      h3: { fontSize: '1.5rem', fontWeight: 600 },
    },
  })

  const buttonStyle = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h1' sx={{ flexGrow: 1 }}>
              Blog App
            </Typography>
            <Button color='inherit' component={Link} to='/' sx={buttonStyle}>
              Blogs
            </Button>
            <Button color='inherit' component={Link} to='/users' sx={buttonStyle}>
              Users
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
              <Button color='inherit' variant='text' onClick={() => userLogout()} sx={buttonStyle}>
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
            <Route path='/users' element={<UserList />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<Blog loggedInUser={user} />} />
            <Route path='/newblog' element={user && <NewBlogForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/*' element={<Error404 />} />
          </Routes>
        </ErrorBoundary>
      </Container>
    </ThemeProvider>
  )
}

export default App
