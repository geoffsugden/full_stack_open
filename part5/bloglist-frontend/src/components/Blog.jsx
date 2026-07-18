import Togglable from './Togglable'

const Blog = ({ blog, updateLikes, loggedInUser, removeBlogListing, }) => {

  if(!blog) {
    return null
  }

  if(loggedInUser) {
    console.log('User', loggedInUser)
  }

  const addLike = async (event) => {
    event.preventDefault()
    updateLikes(blog)
  }

  const handleDeleteBlog = async (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogListing(blog)
    }
  }

  const canDelete = loggedInUser && loggedInUser.username === blog.user.username
  const canLike = loggedInUser

  return (
    <div className='blog'>
      <div className='blog-title' >Title: {blog.title}</div>
      <div className='blog-author'>Author: {blog.author}</div>
      <div className='blog-likes'>Likes: {blog.likes}
        {canLike && <button className='like-button' onClick={addLike}>Like</button>}
      </div>
      <div className='blog-url'>url: <a href={blog.url}>{blog.url}</a></div>
      <div className='blog-user'>Added By: {blog.user.name}</div>
      {canDelete &&
        <button className='remove-blog-button' onClick={handleDeleteBlog}>Delete</button>
      }
    </div>
  )
}

export default Blog