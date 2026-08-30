import React from 'react'
import { useMatch } from 'react-router-dom'
import useUsers from '../hooks/userUsers'
import { Card, CardHeader, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'

const User = () => {
  const { users, isPending, isError } = useUsers()
  const match = useMatch('users/:id')

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Unable to fetch Users...</div>

  const user = users.find((u) => u.id === match.params.id)
  if (!user) return null

  return (
    <Card elevation={3}>
      <CardHeader title={<Typography variant='h2'>{user.name}</Typography>} />
      <Typography variant='h3' sx={{ pt: 2, px: 2 }}>
        Added Blogs
      </Typography>
      <List sx={{ width: '70%', mb: 2 }}>
        {user.blogs.map((blog) => (
          <React.Fragment key={blog.id}>
            <ListItemButton component='a' href={`/blogs/${blog.id}`} sx={{ py: 0.5 }}>
              <ListItemText
                primary={blog.title}
                sx={{ bgcolor: 'grey.100', p: 1.5, borderRadius: 2, width: 'fit-content' }}
              />
            </ListItemButton>
          </React.Fragment>
        ))}
      </List>
    </Card>
  )
}

export default User
