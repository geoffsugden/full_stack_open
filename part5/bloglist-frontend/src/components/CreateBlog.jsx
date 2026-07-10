import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ addNewBlog, showMsg, logout }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.createBlogListing({ title, author, url })
      addNewBlog(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      showMsg({ msg: `Blog ${title} added succesfully.`, msgType: 'message' } )
    } catch (e) {
      if (e.response.data.error) {
        if(e.response.data.error === 'token expired') {
          window.localStorage.removeItem('loggedBlogListUser')
          logout(null)
          showMsg({ msg:'Your session expired and you have been logged out. Please login in again to continue.', msgType: 'error' })
        } else {
          showMsg({ msg:e.response.data.error, msgType: 'error' })
        }
      } else {
        showMsg({ msg:'An unknown error occurred, please check your entry and try again.' })
      }
    }
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