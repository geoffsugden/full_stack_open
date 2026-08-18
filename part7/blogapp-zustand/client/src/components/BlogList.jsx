import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { useBlogs } from '../stores/blogStore'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useBlogs()

  return (
    <div>
      <Typography variant='h5' sx={{ pt: 2 }}>
        Behold the favourite Blogs
      </Typography>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default BlogList
