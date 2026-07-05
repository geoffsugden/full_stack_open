const Blog = ({ blog }) => (
  <div className='blog'>
    <p className='blog-title' >{blog.title}</p> 
    <p className='blog-author'>{blog.author}</p>
  </div>  
)

export default Blog