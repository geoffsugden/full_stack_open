const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/',  async (request, response) => {
  const blogs = await Blog.find({}).populate('user')

  response.status(200).json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog =  await Blog.findById(request.params.id)
  if(blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const usernames = ['gds48', 'otg57', 'bbb66']
  const pickThis = Math.floor(Math.random() * 3)
  const users = await User.find({ username: usernames[pickThis] })
  const user = users[0]

  console.log('User', user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user,
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
    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()
    response.status(200).json(updatedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const retval = await Blog.findByIdAndDelete(request.params.id)
  if(retval) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter