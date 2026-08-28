import { Link } from 'react-router-dom'
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material'
import useBlogs from '../hooks/useBlogs'

const BlogList = () => {
  const { blogs, isPending, isError } = useBlogs()

  if (isPending) return <div>Loading data...</div>
  if (isError) return <div>Unable to retrieve blogs, an error occured.</div>

  return (
    <div>
      <Typography variant='h5' sx={{ pt: 2 }}>
        Behold the favourite Blogs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Blog</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Likes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>{blog.author}</TableCell>
              <TableCell>{blog.likes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ul></ul>
    </div>
  )
}
export default BlogList
