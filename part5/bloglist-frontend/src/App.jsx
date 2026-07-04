import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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

  return (
    <div>
      <h2>blogs</h2>
      {!user && (<LoginForm onLoginSuccess={setUser} />)}
      {user && (
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      )}
    </div>
  )
}

export default App