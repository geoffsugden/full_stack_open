import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { MessageContext } from '../context/MessageContext'
import { UserContext } from '../context/userContext'
import blogService from '../services/blogs'

export const useBlogs = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { displayMessage } = useContext(MessageContext)
  const { setUser } = useContext(UserContext)

  const handleError = (error) => {
    if (error.response) {
      if (error.response.data.error === 'token expired') {
        setUser(null)
        window.localStorage.removeItem('loggedBlogListUser')
        displayMessage({
          msg: 'Your session expired and you have been logged out. Please login in again to continue.',
          msgType: 'warning',
        })
      } else {
        displayMessage({ msg: error.response.data.error, msgType: 'warning' })
      }
    } else {
      console.log('An unknown error occurred', error)
      displayMessage({ msg: 'An unknown error occurred, please check your entry and try again.', msgType: 'warning' })
    }
  }

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlogListing,
    onSuccess: (data) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], [...blogs, data])
      displayMessage({ msg: `Blog ${data.title} added succesfully.`, msgType: 'success' })
    },
    onError: handleError,
  })

  const likeBlogMutation = useMutation({
    mutationFn: blogService.likeBlog,
    onSuccess: (data) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === data.id ? { ...blog, likes: data.likes } : blog))
      )
    },
    onError: handleError,
  })

  const addBlogCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (data) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === data.id ? { ...blog, comments: data.comments } : blog))
      )
    },
    onError: handleError,
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
    onError: handleError,
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
    addBlog: (blog) => newBlogMutation.mutate(blog),
    addLike: (blog) => likeBlogMutation.mutate(blog),
    addComment: (blogId, comment) => {
      addBlogCommentMutation.mutate({ blogId, comment })
    },
    removeBlog: (blog) => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        removeBlogMutation.mutate(blog.id)
        navigate('/')
        displayMessage({ msg: `Blog ${blog.title} by ${blog.author} removed.`, msgType: 'success' })
      }
    },
  }
}

export default useBlogs
