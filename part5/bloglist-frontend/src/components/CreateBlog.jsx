import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewBlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const navigate = useNavigate()

  const handleNewBlog = async (event) => {
    event.preventDefault()

    addNewBlog({ title, author, url })
    navigate('/')
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add New Blog Listing</h2>
      <form onSubmit={handleNewBlog} className='form-container'>
        <label htmlFor='title'>title:</label>
        <input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor='author'>author:</label>
        <input id='author' type='text' value={author} onChange={(e) => setAuthor(e.target.value)} />

        <label htmlFor='url'>url:</label>
        <input id='url' type='url' value={url} onChange={(e) => setUrl(e.target.value)} />

        <button type='submit'>Add Blog</button>
      </form>
    </div>
  )
}

export default NewBlogForm