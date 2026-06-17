require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/note')
const logger = require('./utils/logger')


const app = express()
app.use(express.json())

logger.info('connecting to ', process.env.TEST_MONGODB_URI)

mongoose.set('strictQuery', false)

mongoose
  .connect(process.env.TEST_MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

const note = new Note({
  content: 'HTML is fun',
  important: true,
})

note.save()
  .then(() => {
    logger.info('note saved!')
    mongoose.connection.close()
    process.exit(1)
  })


app.listen(process.env.PORT, () => {
  logger.info(`Server running on port ${process.env.PORT}`)
})