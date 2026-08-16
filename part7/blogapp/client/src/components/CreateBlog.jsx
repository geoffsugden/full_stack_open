import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography } from '@mui/material'

const NewBlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const navigate = useNavigate()

  const handleNewBlog = async event => {
    event.preventDefault()

    addNewBlog({ title, author, url })
    navigate('/')
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Typography variant='h4' sx={{ py: 2 }}>
        Add New Blog Listing
      </Typography>
      <form onSubmit={handleNewBlog} className='form-container'>
        <TextField
          id='title'
          className='new-blog-input'
          type='text'
          value={title}
          label='title'
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          id='author'
          className='new-blog-input'
          type='text'
          value={author}
          label='author'
          onChange={e => setAuthor(e.target.value)}
        />
        <TextField
          id='url'
          className='new-blog-input'
          type='url'
          value={url}
          label='url'
          onChange={e => setUrl(e.target.value)}
        />

        <Button type='submit' variant='contained' style={{ marginTop: 10 }}>
          Create
        </Button>
      </form>
    </div>
  )
}

export default NewBlogForm
