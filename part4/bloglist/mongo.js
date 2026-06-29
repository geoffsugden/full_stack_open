require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
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

  const user = await User.findOne({ username: 'gds48' })

  const userForToken = ({
    username: user.username,
    id: user._id
  })

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 30 }
  )
  console.log('==========================================================================')
  console.log('Token', token)
  console.log('==========================================================================')

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

