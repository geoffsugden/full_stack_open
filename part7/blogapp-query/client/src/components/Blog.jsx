import { useMatch } from 'react-router-dom'
import React from 'react'
import {
  Avatar,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  CardHeader,
  Stack,
  Box,
} from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import useBlogs from '../hooks/useBlogs'
import useField from '../hooks/useField'

const Blog = ({ loggedInUser }) => {
  const { blogs, isPending, isError, addLike, addComment, removeBlog } = useBlogs()
  // eslint-disable-next-line no-unused-vars
  const { reset: resetComment, ...comment } = useField({ id: 'commment', type: 'text', label: 'commment' })
  const match = useMatch('/blogs/:id')

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Unable to fetch blogs.</div>

  const blog = blogs.find((b) => b.id === match.params.id)
  if (!blog) return null

  const handleAddComment = (event) => {
    event.preventDefault()
    addComment(blog.id, comment.value)
    resetComment()
  }

  const canLike = loggedInUser && loggedInUser.username === blog.user.username
  const canDelete = canLike
  const canComment = loggedInUser

  return (
    <Card elevation={2} className='blog' sx={{ mb: 4, pl: 2, pr: 2, pb: 2, borderRadius: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>{blog.author ? blog.author.charAt(0).toUpperCase() : '?'}</Avatar>
        }
        title={
          <Typography className='blog-title' variant='h2' fontWeight='bold'>
            {blog.title}
          </Typography>
        }
        subheader={`by ${blog.author} • Added by ${blog.user.name}`}
      />
      <Link href={blog.url} underline='hover' sx={{ display: 'block', mb: 2, wordBreak: 'break-all' }}>
        {blog.url}
      </Link>
      <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
        <Typography variant='body1' fontWeight='medium'>
          {blog.likes} likes
        </Typography>
        {canLike && (
          <Button variant='contained' size='small' startIcon={<ThumbUpOutlinedIcon />} onClick={() => addLike(blog)}>
            Like
          </Button>
        )}
        {canDelete && (
          <Button
            variant='outlined'
            color='error'
            size='small'
            sx={{ ml: 'auto' }}
            className='remove-blog-button'
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={() => removeBlog(blog)}>
            Delete
          </Button>
        )}
      </Stack>
      <Typography variant='h3' sx={{ mt: 2, mb: 1 }}>
        Comments
      </Typography>
      <List sx={{ width: '70%', mb: 2 }}>
        {blog.comments &&
          blog.comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText
                  primary={comment.comment}
                  sx={{ bgcolor: 'grey.100', p: 1.5, borderRadius: 2, width: 'fit-content' }}
                />
              </ListItem>
            </React.Fragment>
          ))}
      </List>

      {canComment && (
        <Box component='form' onSubmit={handleAddComment} sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <TextField
            fullWidth
            size='small'
            placeholder='Write a comment...'
            value={comment.value}
            onChange={comment.onChange}
            variant='outlined'
            id={comment.id}
          />
          <Button type='submit' variant='contained' color='primary' disableElevation sx={{ whiteSpace: 'nowrap' }}>
            Post
          </Button>
        </Box>
      )}
    </Card>
  )
}

export default Blog
