import { useMatch } from 'react-router-dom'
import { TextField, Button, Typography, Paper, Link, Box } from '@mui/material'
import useBlogs from '../hooks/useBlogs'
import useField from '../hooks/useField'

const Blog = ({ loggedInUser }) => {
  const { blogs, isPending, isError, addLike, updateBlog, removeBlog } = useBlogs()
  // eslint-disable-next-line no-unused-vars
  const { reset: resetComment, ...comment } = useField({ id: 'commment', type: 'text', label: 'commment' })
  const match = useMatch('/blogs/:id')

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Unable to fetch blogs.</div>

  const blog = blogs.find((b) => b.id === match.params.id)
  if (!blog) return null

  const handleAddComment = (event) => {
    event.preventDefault()
    updateBlog({ ...blog, comments: blog.comments.concat({ comment: comment.value }) })
  }

  const canDelete = loggedInUser && loggedInUser.username === blog.user.username
  const canLike = loggedInUser
  const canComment = canLike

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
      <Typography className='blog-comments-header' variant='h6'>
        Comments
      </Typography>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
      {canComment && (
        <form onSubmit={handleAddComment} className='comment-container'>
          <TextField {...comment} variant='outlined' />
          <Button variant='outlined' color='primary' className='add-comment-button' type='submit'>
            Add Comment
          </Button>
        </form>
      )}
    </Paper>
  )
}

export default Blog
