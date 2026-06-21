const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const app = require('../app')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./testHelper')
const User = require('../models/user')

const api = supertest(app)
describe('BlogsAPI User / Login tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const rootUser = new User({ username: 'root', passwordHash })

    await rootUser.save()

    for(const u of helper.initialUsers) {
      const pwHash = await bcrypt.hash(u.password, 10)
      const newUser = new User({ username: u.username, name: u.name, passwordHash: pwHash })
      await newUser.save()
    }
  })

  describe('User Retrieval Tests', () => {
    test('All users retrieved from database', async() => {
      const users = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // numUsers should equal root + initial Users i.e. initialUsers + 1
      assert.strictEqual(users.body.length, helper.initialUsers.length + 1)

    })
  })

  describe('User Creation Tests', () => {
    test('user creation fails with non-unique username', async() => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: usersAtStart[1].username,
        name: usersAtStart[1].name,
        password: 'password'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error.includes('expected `username` to be unique'))
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('user creation fails with username < 3 characters long', async() => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        'username': 'no',
        'name': 'This won\'t work',
        'password': 'password'
      }

      const userNamesAtStart = usersAtStart.map(u => u.username)
      assert(!userNamesAtStart.includes(newUser.username))

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error.includes('username must be minimum 3 characters long'))
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('user creation fails no username', async() => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        'name': 'This won\'t work',
        'password': 'password'
      }

      const userNamesAtStart = usersAtStart.map(u => u.username)
      assert(!userNamesAtStart.includes(newUser.username))

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error.includes('username is a required field.'))
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('user creation fails with password < 3 characters long.', async() => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        'username': 'badPassword',
        'name': 'This won\'t work',
        'password': 'n'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error.includes('password must be minimum 3 characters long.'))
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('user creation fails with no password', async() => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        'username': 'noPassword',
        'name': 'This won\'t work'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error.includes('password must be minimum 3 characters long.'))
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)

    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'elm34',
        name: 'Elmo Puppet',
        password: 'whatAMuppet'
      }

      const usernamesAtStart = usersAtStart.map(u => u.username)
      assert(!usernamesAtStart.includes(newUser.username))

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('creation fails with an existing username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = { username: helper.initialUsers[1].username, name: helper.initialUsers[1].name, password: 'password' }

      const usernamesAtStart = usersAtStart.map(u => u.username)
      assert(usernamesAtStart.includes(newUser.username))

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
      assert(result.body.error.includes('expected `username` to be unique'))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})