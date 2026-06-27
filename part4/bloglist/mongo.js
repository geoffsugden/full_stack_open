require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const User = require('./models/user')
const logger = require('./utils/logger')
const helper = require('./tests/testHelper')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())

const url = process.env.TEST_MONGODB_URI

const doStuff = async () => {
  logger.info('connecting to ', url)

  mongoose.set('strictQuery', false)

  await mongoose.connect(url, { family: 4 })

  logger.info('connected to MongoDB')

  await Blog.deleteMany({})
  await User.deleteMany({})

  const promises = helper.initialUsers.map(async (user) => {
    const hash = await bcrypt.hash(user.password, 10)
    return {
      ...user,
      passwordHash: hash
    }
  })

  const users = await Promise.all(promises)

  await User.insertMany(users)

  const usersInDB = await User.find({ username: 'gds48' })
  const user = usersInDB[0]

  const blogs = helper.initialBlogs.map(blog => {
    return {
      ...blog,
      user: user.id
    }
  })

  await Blog.insertMany(blogs)

  const blogsInDb = await Blog.find({})

  const blogIds = blogsInDb.map(blog => blog.id)

  user.blogs = blogIds
  await user.save()

  await mongoose.connection.close()
  process.exit(0)
}

doStuff()
mongoose.connect(url, { family: 4 })
  .then(() => {
  })
  .catch(error => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

