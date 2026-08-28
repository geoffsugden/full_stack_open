import { useMatch } from 'react-router-dom'
import useUsers from '../hooks/userUsers'
import { Typography } from '@mui/material'

const User = () => {
  const { users, isPending, isError } = useUsers()
  const match = useMatch('users/:id')

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Unable to fetch Users...</div>

  const user = users.find((u) => u.id === match.params.id)
  if (!user) return null

  return (
    <div>
      <Typography variant='h4' sx={{ pt: 2 }}>
        {user.name}
      </Typography>
      <Typography variant='h5' sx={{ pt: 2 }}>
        Added Blogs
      </Typography>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
