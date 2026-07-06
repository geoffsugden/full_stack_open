import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notifications'
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
      setBlogs( blogs )
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

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    localStorage.removeItem('loggedBlogListUser')
    setMessage({msg:'You have been logged out', msgType:'message'})
    setTimeout(() => setMessage({msg:null, msgType:null}), 5000)
  }

  const addBlog = (blogObject) => {
    setBlogs(blogs.concat(blogObject))
  }

  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage({msg:null, msgType:null}), 5000)
  }

  return (
    <div>
      <h1>Bloglist Application</h1>
      <Notification message={ message } />
      {!user && (
        <div>
          <LoginForm onLoginSuccess={setUser} showMsg={displayMessage} />
        </div>
      )}
      {user && (
        <div>
          <form onSubmit={handleLogout}>
            <p>{user.name} logged in <button type='submit'>Logout</button></p>
          </form>
          <NewBlogForm addNewBlog={addBlog} showMsg={displayMessage} />
        </div>
      )}
      <br />
      <h2>Behold the favourite Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App