import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography } from '@mui/material'
import { useMessage, useBlogActions } from '../store'

const NewBlogForm = () => {
  const { addBlog } = useBlogActions()
  const { displayMessage } = useMessage()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const navigate = useNavigate()

  const handleNewBlog = async event => {
    event.preventDefault()

    try {
      const newBlog = await addBlog({ title, author, url })
      displayMessage({ msg: `Blog ${newBlog.title} by ${newBlog.author} has been added.`, msgType: 'success' })
    } catch (e) {
      if (e.response.data.error) {
        if (e.response.data.error === 'token expired') {
          //setUser(null)
          window.localStorage.removeItem('loggedBlogListUser')
          displayMessage({
            msg: 'Your session expired and you have been logged out. Please login in again to continue.',
            msgType: 'error',
          })
        } else {
          displayMessage({ msg: e.response.data.error, msgType: 'error' })
        }
      } else {
        displayMessage({ msg: 'An unknown error occurred, please check your entry and try again.', msgType: 'error' })
      }
    }
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
