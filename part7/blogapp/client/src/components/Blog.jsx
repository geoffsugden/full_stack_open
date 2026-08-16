import { Button, Typography, Paper, Link, Box } from '@mui/material'

const Blog = ({ blog, updateLikes, loggedInUser, removeBlogListing }) => {
  if (!blog) {
    return null
  }

  const addLike = async event => {
    event.preventDefault()
    updateLikes(blog)
  }

  const handleDeleteBlog = async event => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogListing(blog)
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
            <Button variant='outlined' className='like-button' onClick={addLike} sx={{ ml: 1 }}>
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
