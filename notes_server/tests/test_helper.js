const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'testPassword'
  },
  {
    username: 'gds48',
    name: 'Geoff Sugden',
    password: 'testPassword'
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const populateUsers = async() => {
  await User.deleteMany()
  await User.insertMany(initialUsers)
}

module.exports = {
  initialNotes, nonExistingId, notesInDb, usersInDb, populateUsers
}