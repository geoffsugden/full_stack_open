/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography } from '@mui/material'
import { useBlogs } from '../hooks/useBlogs'
import useField from '../hooks/useField'

const NewBlogForm = () => {
  const { addBlog } = useBlogs()
  const { reset: resetTitle, ...title } = useField({ id: 'title', type: 'text', label: 'title' })
  const { reset: resetAuthor, ...author } = useField({ id: 'author', type: 'text', label: 'author' })
  const { reset: resetUrl, ...url } = useField({ id: 'url', type: 'url', label: 'url' })

  const navigate = useNavigate()

  const handleNewBlog = (event) => {
    event.preventDefault()

    addBlog({ title: title.value, author: author.value, url: url.value })
    navigate('/')
  }

  return (
    <div>
      <Typography variant='h4' sx={{ py: 2 }}>
        Add New Blog Listing
      </Typography>
      <form onSubmit={handleNewBlog} className='form-container'>
        <TextField {...title} className='new-blog-input' />
        <TextField {...author} className='new-blog-input' />
        <TextField {...url} className='new-blog-input' />

        <Button type='submit' variant='contained' style={{ marginTop: 10 }}>
          Create
        </Button>
      </form>
    </div>
  )
}

export default NewBlogForm
