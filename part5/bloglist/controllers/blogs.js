const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/',  async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.status(200).json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(request.userId)
  if(!user) {
    response.status(401).json({ error: 'invalid token' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)
  if(!blog) {
    return response.status(404).end()
  } else {
    // Instructions don't specify if updates should be allowed by someone other than the original user.
    // making the assumption that only likes can be updated without authentication.
    if(blog.user.toString() !== request.userId && (title || author || url )) {
      if(request.userId) {
        return response.status(403).json({ error: 'blog title, author and url can only be modified by its creator' })
      } else {
        return response.status(401).json({ error: 'you must be logged in to perform this operation' })
      }
    } else {
      blog.title = title ?? blog.title
      blog.author = author ?? blog.author
      blog.url = url ?? blog.url
      blog.likes = likes ?? blog.likes

      const updatedBlog = await blog.save()
      response.status(200).json(updatedBlog)
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if(!blog) {
    response.status(404).end()
  } else if (blog.user.toString() !== request.userId) {
    if(request.userId) {
      return response.status(403).json({ error: 'blog listing can only be deleted by creator' })
    } else {
      return response.status(401).json({ error: 'you must be logged in to perform this operation' })
    }
  } else {
    const deleteSuccesful = await Blog.findByIdAndDelete(blogId)
    if(deleteSuccesful) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  }
})

module.exports = blogsRouter