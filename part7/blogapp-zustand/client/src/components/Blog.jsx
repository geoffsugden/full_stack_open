import { Button, Typography, Paper, Link, Box } from '@mui/material'
import { useBlogActions, useMessage } from '../store'
import { useNavigate, useParams } from 'react-router-dom'

const Blog = ({ loggedInUser }) => {
  const { retrieveBlog, updateBlogLikes, removeBlog } = useBlogActions()
  const { displayMessage } = useMessage()
  const navigate = useNavigate()
  const blogId = useParams()

  const blog = retrieveBlog(blogId.id)

  if (!blog) {
    return null
  }

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await removeBlog(blog.id)
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
  }

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
            <Button variant='outlined' className='like-button' onClick={() => updateBlogLikes(blog)} sx={{ ml: 1 }}>
              Like
            </Button>
          )}
        </Typography>
        {canDelete && (
          <Button
            variant='outlined'
            color='error'
            className='remove-blog-button'
            onClick={handleDeleteBlog}
            sx={{ mb: 1 }}>
            Delete
          </Button>
        )}
      </Box>
    </Paper>
  )
}

export default Blog
