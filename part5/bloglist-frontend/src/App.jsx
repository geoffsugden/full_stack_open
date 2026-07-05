import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogListUser')
    
  }

  const addBlog = (blogObject) => {
    setBlogs(blogs.concat(blogObject))
  }

  return (
    <div>
      <h1>Bloglist Application</h1>
      {!user && (
        <div>
          <LoginForm onLoginSuccess={setUser} />
        </div>
      )}
      {user && (
        <div>
          <form onSubmit={handleLogout}>
            <p>{user.name} logged in <button type='submit'>Logout</button></p>
          </form>
          <NewBlogForm showNewBlog={addBlog}/>
        </div>
      )}
      <br />
      <h2>Behold the favourite Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App