import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { MessageContext } from '../MessageContext'
import blogService from '../services/blogs'

export const useBlogs = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { displayMessage } = useContext(MessageContext)

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlogListing,
    onSuccess: (data) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], [...blogs, data])
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlogListing,
    onSuccess: (data) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === data.id ? { ...blog, likes: data.likes } : blog))
      )
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.removeBlog,
    onSuccess: (data) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((blog) => blog.id !== data).sort((a, b) => b.likes - a.likes)
      )
    },
  })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await blogService.getAll()
      return response.toSorted((a, b) => b.likes - a.likes)
    },
  })

  return {
    blogs: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addBlog: (blog) => {
      try {
        newBlogMutation.mutate(blog)
        displayMessage({ msg: `Blog ${blog.title} added succesfully.`, msgType: 'success' })
      } catch (e) {
        if (e.response) {
          if (e.response.data.error === 'token expired') {
            // setUser(null)
            window.localStorage.removeItem('loggedBlogListUser')
            displayMessage({
              msg: 'Your session expired and you have been logged out. Please login in again to continue.',
              msgType: 'info',
            })
          } else {
            displayMessage({ msg: e.response.data.error, msgType: 'warning' })
          }
        } else {
          console.log('An unknown error occurred', e)
          displayMessage({
            msg: 'An unknown error occurred, please check your entry and try again.',
            msgType: 'warning',
          })
        }
      }
    },
    addLike: (blog) => updateBlogMutation.mutate({ id: blog.id, likes: blog.likes + 1 }),
    removeBlog: (blog) => {
      try {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
          removeBlogMutation.mutate(blog.id)
          navigate('/')
          displayMessage({ msg: `Blog ${blog.title} by ${blog.author} removed.`, msgType: 'success' })
        }
      } catch (e) {
        if (e.response) {
          if (e.reponse.data.error === 'token expired') {
            window.localStorage.removeItem('loggedBlogListUser')
            displayMessage({
              msg: 'Your session expired and you have been logged out. Please login in again to continue.',
              msgType: 'info',
            })
          } else {
            displayMessage({ msg: e.response.data.error, msgType: 'warning' })
          }
        } else {
          console.log('An unknown error occurred', e)
          displayMessage({
            msg: 'An unknown error occurred, please check your entry and try again.',
            msgType: 'warning',
          })
        }
      }
    },
  }
}

export default useBlogs
