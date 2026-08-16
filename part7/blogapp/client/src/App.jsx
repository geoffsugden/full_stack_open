import { useState, useEffect } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import NewBlogForm from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notifications'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import ErrorBoundary from './components/ErrorBoundary'
import Error404 from './components/Error404'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ msg: null, msgType: null })

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const navigate = useNavigate()

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(b => b.id === match.params.id) : null
  const addBlog = async blogObject => {
    try {
      const newBlog = await blogService.createBlogListing({ ...blogObject })
      if (newBlog) {
        setBlogs(blogs.concat(newBlog).sort((a, b) => b.likes - a.likes))
      }
      displayMessage({ msg: `Blog ${newBlog.title} added succesfully.`, msgType: 'success' })
    } catch (e) {
      if (e.response.data.error) {
        if (e.response.data.error === 'token expired') {
          setUser(null)
          window.localStorage.removeItem('loggedBlogListUser')
          displayMessage({
            msg: 'Your session expired and you have been logged out. Please login in again to continue.',
            msgType: 'error',
          })
        } else {
          displayMessage({ msg: e.response.data.error, msgType: 'error' })
        }
      } else {
        displayMessage({ msg: 'An unknown error occurred, please check your entry and try again.' })
      }
    }
  }

  const updateBlogLikes = async blog => {
    const updatedBlog = await blogService.updateBlogListing({ id: blog.id, likes: blog.likes + 1 })
    setBlogs(prevBlogs =>
      prevBlogs
        .map(b => (b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b))
        .sort((a, b) => b.likes - a.likes)
    )
  }

  const removeBlog = async blog => {
    try {
      await blogService.removeBlog(blog.id)
      setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== blog.id))
      navigate('/')
      displayMessage({ msg: `Blog ${blog.title} by ${blog.author} removed.`, msgType: 'success' })
    } catch (e) {
      if (e.response.data.error) {
        if (e.response.data.error === 'token expired') {
          window.localStorage.removeItem('loggedBlogListUser')
          displayMessage({
            msg: 'Your session expired and you have been logged out. Please login in again to continue.',
            msgType: 'warning',
          })
        } else {
          displayMessage({ msg: e.response.data.error, msgType: 'error' })
        }
      } else {
        displayMessage({ msg: 'An unknown error occurred, please check your entry and try again.' })
      }
    }
  }

  const handleLogout = event => {
    if (event) {
      event.preventDefault()
    }
    setUser(null)
    localStorage.removeItem('loggedBlogListUser')
    navigate('/')
    setMessage({ msg: 'You have been logged out', msgType: 'message' })
    setTimeout(() => setMessage({ msg: null, msgType: null }), 5000)
  }

  const displayMessage = message => {
    setMessage(message)
    setTimeout(() => setMessage({ msg: null, msgType: null }), 7000)
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
      <ErrorBoundary>{message.msg && <Notification message={message} />}</ErrorBoundary>
      <ErrorBoundary>
        <Routes>
          <Route
            path='/'
            element={
              <BlogList blogs={blogs} user={user} updateBlogLikes={updateBlogLikes} removeBlog={removeBlog} />
            }></Route>
          <Route
            path='/blogs/:id'
            element={
              <Blog blog={blog} updateLikes={updateBlogLikes} loggedInUser={user} removeBlogListing={removeBlog} />
            }
          />
          <Route path='/newblog' element={user && <NewBlogForm addNewBlog={addBlog} />} />
          <Route path='/login' element={<LoginForm onLoginSuccess={setUser} showMsg={displayMessage} />} />
          <Route path='/*' element={<Error404 />} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
