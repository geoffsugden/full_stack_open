import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import NewBlogForm from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notifications'
import Togglable from './components/Togglable'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    msg: null,
    msgType: null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )
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
  const addBlog = async(blogObject) => {
    try {
      const newBlog = await blogService.createBlogListing({ ...blogObject })
      if(newBlog) {
        setBlogs(blogs.concat(newBlog).sort((a,b) => b.likes - a.likes))
      }
      displayMessage({ msg: `Blog ${newBlog.title} added succesfully.`, msgType: 'message' } )
    } catch (e) {
      if (e.response.data.error) {
        if(e.response.data.error === 'token expired') {
          setUser(null)
          window.localStorage.removeItem('loggedBlogListUser')
          displayMessage({ msg:'Your session expired and you have been logged out. Please login in again to continue.', msgType: 'error' })
        } else {
          displayMessage({ msg:e.response.data.error, msgType: 'error' })
        }
      } else {
        displayMessage({ msg:'An unknown error occurred, please check your entry and try again.' })
      }
    }
  }

  const updateBlogLikes = async (blog) => {
    const updatedBlog = await blogService.updateBlogListing({
      id: blog.id,
      likes: blog.likes + 1
    })
    setBlogs(prevBlogs =>
      prevBlogs.map(b =>
        b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b
      ).sort((a,b) => b.likes - a.likes)
    )
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.removeBlog(blog.id)
      setBlogs(prevBlogs =>
        prevBlogs.filter(b => b.id !== blog.id)
      )
      navigate('/')
      displayMessage({ msg: `Blog ${blog.title} by ${blog.author} removed.`, msgType: 'message' })
    } catch (e) {
      if (e.response.data.error) {
        if(e.response.data.error === 'token expired') {
          window.localStorage.removeItem('loggedBlogListUser')
          displayMessage({ msg:'Your session expired and you have been logged out. Please login in again to continue.', msgType: 'error' })
        } else {
          displayMessage({ msg:e.response.data.error, msgType: 'error' })
        }
      } else {
        displayMessage({ msg:'An unknown error occurred, please check your entry and try again.' })
      }
    }
  }

  const handleLogout = (event) => {
    if(event) { event.preventDefault() }
    setUser(null)
    localStorage.removeItem('loggedBlogListUser')
    navigate('/')
    setMessage({ msg:'You have been logged out', msgType:'message' })
    setTimeout(() => setMessage({ msg:null, msgType:null }), 5000)

  }

  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage({ msg:null, msgType:null }), 7000)
  }

  const padding = {
    padding: 5
  }
  return (
    <div>
      <Notification message={ message } />
      <div>
        <Link style={padding} to="/">Blogs</Link>
        {user && (<Link style={padding} to="/newblog">New Blog</Link>)}
        {!user && (<Link style={padding} to="/login">Login</Link>)}
        {user && (<button onClick={handleLogout}>Logout</button>)}
      </div>

      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} user={user} updateBlogLikes={updateBlogLikes} removeBlog={removeBlog} />}></Route>
        <Route path="/blogs/:id" element={<Blog blog={blog} updateLikes={updateBlogLikes} loggedInUser={user} removeBlogListing={removeBlog} />}/>
        <Route path="/newblog" element={(user && <NewBlogForm addNewBlog={addBlog} />)} />
        <Route path="/login" element={<LoginForm onLoginSuccess={setUser} showMsg={displayMessage} />} />
      </Routes>
    </div>
  )
}

export default App