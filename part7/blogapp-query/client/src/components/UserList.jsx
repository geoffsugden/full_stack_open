import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import useUsers from '../hooks/userUsers'

const UserList = () => {
  const { users, isPending, isError } = useUsers()

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Danger Will Robinson...</div>

  return (
    <div>
      <Typography variant='h5' sx={{ pt: 2 }}>
        We Proudly Present Our Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>UserName</TableCell>
            <TableCell>Blogs Created</TableCell>
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
    </div>
  )
}

export default UserList
