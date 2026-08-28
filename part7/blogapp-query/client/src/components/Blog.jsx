import { useMatch } from 'react-router-dom'
import { Button, Typography, Paper, Link, Box } from '@mui/material'
import useBlogs from '../hooks/useBlogs'

const Blog = ({ loggedInUser }) => {
  const { blogs, isPending, isError, addLike, removeBlog } = useBlogs()
  const match = useMatch('/blogs/:id')

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Unable to fetch blogs.</div>

  const blog = blogs.find((b) => b.id === match.params.id)
  if (!blog) return null

  const canDelete = loggedInUser && loggedInUser.username === blog.user.username
  const canLike = loggedInUser

  return (
    <Paper className='blog' sx={{ mt: 1, p: 2 }}>
      <Typography className='blog-title' variant='h5' sx={{ fontWeight: 'heavy' }}>
        {blog.title}
      </Typography>
      <Typography className='blog-author' variant='subtitle1'>
        by {blog.author}
      </Typography>

      <Link href={blog.url} className='blog-url'>
        {blog.url}
      </Link>
      <Typography className='blog-user' variant='body2'>
        Added by {blog.user.name}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        <Typography className='blog-likes' variant='body1'>
          {blog.likes} likes
          {canLike && (
            <Button variant='outlined' className='like-button' onClick={() => addLike(blog)} sx={{ ml: 1 }}>
              Like
            </Button>
          )}
        </Typography>
        {canDelete && (
          <Button
            variant='outlined'
            color='error'
            className='remove-blog-button'
            onClick={() => removeBlog(blog)}
            sx={{ mb: 1 }}>
            Delete
          </Button>
        )}
      </Box>
    </Paper>
  )
}

export default Blog
