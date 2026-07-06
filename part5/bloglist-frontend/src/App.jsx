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

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    localStorage.removeItem('loggedBlogListUser')
    setMessage({ msg:'You have been logged out', msgType:'message' })
    setTimeout(() => setMessage({ msg:null, msgType:null }), 5000)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(blogObject).sort((a,b) => b.likes - a.likes))
  }

  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage({ msg:null, msgType:null }), 7000)
  }

  const updateBlogLikes = (newObject) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(b =>
        b.id === newObject.id ? { ...b, likes: b.likes + 1 } : b
      ).sort((a,b) => b.likes - a.likes)
    )
  }

  const removeBlog = (blogId) => {
    setBlogs(prevBlogs =>
      prevBlogs.filter(b => b.id !== blogId)
    )
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
            <NewBlogForm addNewBlog={addBlog} showMsg={displayMessage} />
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
          shwMsg={displayMessage}
        />)}
    </div>
  )
}

export default App