import { Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import useUsers from '../hooks/userUsers'

const UserList = () => {
  const { users, isPending, isError } = useUsers()

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Danger Will Robinson...</div>

  return (
    <Paper elevation={3}>
      <Typography variant='h2' sx={{ pt: 2, px: 2, fontWeight: 'bold', fontSize: '2.5rem' }}>
        Contributing Users
      </Typography>
      <Box sx={{ px: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>UserName</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  )
}

export default UserList
