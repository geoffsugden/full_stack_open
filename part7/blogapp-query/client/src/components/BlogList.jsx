import { Link } from 'react-router-dom'
import { Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material'
import useBlogs from '../hooks/useBlogs'

const BlogList = () => {
  const { blogs, isPending, isError } = useBlogs()

  if (isPending) return <div>Loading data...</div>
  if (isError) return <div>Unable to retrieve blogs, an error occured.</div>

  return (
    <Paper elevation={3}>
      <Typography variant='h2' sx={{ pt: 2, px: 2, fontWeight: 'bold', fontSize: '2.5rem' }}>
        The Favourite Blogs
      </Typography>
      <Box sx={{ px: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Blog</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Likes</TableCell>
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
      </Box>
    </Paper>
  )
}
export default BlogList
