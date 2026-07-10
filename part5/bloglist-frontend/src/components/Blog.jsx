import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, updateLikes, loggedInUser, removeBlogListing, shwMsg }) => {

  const addLike = async (event) => {
    event.preventDefault()
    const apiResponse = await blogService.updateBlogListing({
      id: blog.id,
      likes: blog.likes + 1
    })

    updateLikes(apiResponse)
  }

  const handleDeleteBlog = async (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.removeBlog(blog.id)
      removeBlogListing(blog.id)
      shwMsg({ msg: `Blog ${blog.title} by ${blog.author} removed.`, msgType: 'message' })
    }
  }

  const canDelete = loggedInUser && loggedInUser.username === blog.user.username

  return (
    <div className='blog'>
      <div className='blog-title' >Title: {blog.title}</div>
      <div className='blog-author'>Author: {blog.author}</div>
      <Togglable buttonShowLabel='View' buttonHideLabel='Hide' cName='blog-details-display'>
        <div className='blog-likes'>Likes: {blog.likes}<button className='like-button' onClick={addLike}>Like</button></div>
        <div className='blog-url'>url: <a href={blog.url}>{blog.url}</a></div>
        <div className='blog-user'>Added By: {blog.user.name}</div>
        {canDelete &&
          <button className='remove-blog-button' onClick={handleDeleteBlog}>Delete</button>
        }
      </Togglable>
    </div>
  )
}

export default Blog