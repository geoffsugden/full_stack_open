import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
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

  const blogFormRef = useRef()

  const addBlog = async(blogObject) => {
    try {
      const newBlog = await blogService.createBlogListing({ ...blogObject })
      blogFormRef.current.toggleVisibility()
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
    setMessage({ msg:'You have been logged out', msgType:'message' })
    setTimeout(() => setMessage({ msg:null, msgType:null }), 5000)
  }
  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage({ msg:null, msgType:null }), 7000)
  }

  return (
    <div>
      <h1>Bloglist Application</h1>
      <Notification message={ message } />
      {!user && (
        <Togglable buttonShowLabel='Login'>
          <div>
            <LoginForm onLoginSuccess={setUser} showMsg={displayMessage} />
          </div>
        </Togglable>
      )}
      {user && (
        <div>
          <form onSubmit={handleLogout}>
            <p>{user.name} logged in <button type='submit'>Logout</button></p>
          </form>
          <Togglable buttonShowLabel='Create New Blog' ref={blogFormRef}>
            <NewBlogForm addNewBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <br />
      <h2>Behold the favourite Blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateBlogLikes}
          loggedInUser={user}
          removeBlogListing={removeBlog}
        />)}
    </div>
  )
}

export default App