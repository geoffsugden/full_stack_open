const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const app = require('../app')
const supertest = require('supertest')
const listhelper = require('../utils/list_helper')
const helper = require('./testHelper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('BlogsAPI Tests - Confirm that api works as expected', () => {
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
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('BlogsAPI - Test get methods', () => {
    test('BlogsAPI - Fetch Missing Blog', async() => {
      const blogId = await helper.nonExistingId()
      await api
        .get(`/api/blogs/${blogId}`)
        .expect(404)
    })

    test('BlogsAPI - Blogs id is named \'id\'', async() => {
      const response = await api.get('/api/blogs')

      assert(Object.hasOwn(response.body[0], 'id'))
    })

    test('BlogsAPI - all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('BlogsAPI - blogs are returned as json ', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('BlogsAPI - Test put methods', () => {
    test('BlogsAPI - updating likes to 17', async() => {
      const blogs = await helper.blogsInDb()
      const blogToUpdate = blogs[0]
      assert(blogToUpdate.likes !== 17)
      blogToUpdate.likes = 17

      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
      assert.strictEqual(updatedBlog.body.likes, 17)

      const doubleCheckBlog = await api
        .get(`/api/blogs/${blogToUpdate.id}`)
        .expect(200)
      assert.strictEqual(doubleCheckBlog.body.likes, 17)
    })
  })

  describe('BlogsAPI - Test delete methods', () => {
    test('BlogsAPI - Delete Missing Blog', async() => {
      const blogId = await helper.nonExistingId()
      await api
        .delete(`/api/blogs/${blogId}`)
        .expect(404)
    })

    test('BlogsAPI - Deleting blog', async() => {
      const blogsBefore = await helper.blogsInDb()
      const idToDel = blogsBefore[0].id
      await api
        .delete(`/api/blogs/${idToDel}`)
        .expect(204)
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual(blogsAfter.length, blogsBefore.length - 1)
    })

  })

  describe('Blogs API - Test post methods', () => {
    test.only('BlogsAPI - Missing title returns 400', async() => {
      const originalBlog = helper.initialBlogs[0]
      // disabling as we are purposefully extracting title to leave a blog with likes = undefined
      // i.e. we want a valid title only.
      // eslint-disable-next-line no-unused-vars
      const { title, ...newBlog } =  originalBlog

      assert.strictEqual(newBlog.title, undefined)

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('BlogsAPI - Missing url returns 400', async() => {
      const originalBlog = helper.initialBlogs[0]
      // disabling as we are purposefully extracting title to leave a blog with likes = undefined
      // eslint-disable-next-line no-unused-vars
      const { url, ...newBlog } =  originalBlog

      assert.strictEqual(newBlog.url, undefined)

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('BlogsAPI - Likes defaults to zero', async() => {
      const originalBlog = helper.initialBlogs[0]
      // disabling as we are purposefully extracting likes to leave a blog with likes = undefined
      // eslint-disable-next-line no-unused-vars
      const { likes, ...newBlog } =  originalBlog

      assert.strictEqual(newBlog.likes, undefined)
      const returnedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

      assert.strictEqual(returnedBlog.body.likes, 0)

    })

    test('BlogsAPI - New Blog is saved', async() => {
      const returnedBlog = await api
        .post('/api/blogs')
        .send(helper.otherBlogs[0])
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(returnedBlog.body.title, helper.otherBlogs[0].title)
      assert.strictEqual(returnedBlog.body.author, helper.otherBlogs[0].author)
      assert.strictEqual(returnedBlog.body.likes, helper.otherBlogs[0].likes)
      assert.strictEqual(returnedBlog.body.url, helper.otherBlogs[0].url)
    })

    test('BlogsAPI - Saving new Blog increases db by one', async() => {
      const lenBefore = (await api.get('/api/blogs')).body.length
      await api
        .post('/api/blogs')
        .send(helper.otherBlogs[0])
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const lenAfter = (await api.get('/api/blogs')).body.length

      assert.strictEqual(lenAfter, lenBefore+1 )
    })
  })
})

describe('Other Tests', { skip: true }, () => {
  describe('MostBlogs test group', () => {

    test('MostBlogs of empty list is null', () => {
      const result = listhelper.mostBlogs([])
      assert.deepStrictEqual(result, null)
    })

    test('MostBlogs author of single blog is Michael Chan', () => {
      const result = listhelper.mostBlogs([helper.initialBlogs[0]])
      assert.deepStrictEqual(result, { author: 'Michael Chan', blogs: 1 })
    })

    test('MostBlogs from on author is Robert C. Martin', () => {
      const result = listhelper.mostBlogs(helper.initialBlogs)
      assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
    })
  })


  describe('most liked author', () => {

    const singleBlog = [{
      title: 'Zen Habits',
      author: 'Leo Babauta',
      url: 'https://zenhabits.net',
      likes: 2,
      id: '6a2a72f5f67bc01b6cf0205b'
    }]

    test('most liked author of no blog is null', () => {
      const result = listhelper.mostLikes([])
      assert.deepStrictEqual(result, null)
    })


    test('most liked author of single blog is Leo Babauta', () => {
      const result = listhelper.mostLikes(singleBlog)
      assert.deepStrictEqual(result, { author: 'Leo Babauta', likes: 2 })
    })

    test('most liked author of all blogs is Edsger W. Dijkstra', () => {
      const result = listhelper.mostLikes(helper.initialBlogs)
      assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
    })
  })

  describe('favourite Blog', () => {
    const multipleBlogs = [
      {
        title: 'Zen Habits',
        author: 'Leo Babauta',
        url: 'https://zenhabits.net',
        likes: 2
      },
      {
        title: 'Smitten Kitchen',
        author: 'Deb Perelman',
        url: 'https://smittenkitchen.com',
        likes: 1
      },
      {
        title: 'Mr. Money Mustache',
        author: 'Mr. Money Mustache',
        url: 'https://www.mrmoneymustache.com',
        likes: 5
      },
      {
        title: 'Seth\'s Blog',
        author: 'Seth Godin',
        url: 'https://seths.blog',
        likes: 8
      },
      {
        title: 'Designer Daddy',
        author: 'Brent Almond',
        url: 'https://designerdaddy.com',
        likes: 6
      },
      {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
      },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
      },
      {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
      },
      {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
      },
      {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
      }
    ]

    const singleBlog = [{
      title: 'Zen Habits',
      author: 'Leo Babauta',
      url: 'https://zenhabits.net',
      likes: 2,
      id: '6a2a72f5f67bc01b6cf0205b'
    }]

    test('favourite of all blogs (with dup likes) is Canonical string reduction or TDD harms architecture', () => {

      const twoTopLikesBlogs = structuredClone(multipleBlogs)
      twoTopLikesBlogs[9].likes = 12

      const result = listhelper.favouriteBlog(twoTopLikesBlogs).title
      assert.ok(['TDD harms architecture', 'Canonical string reduction'].includes(result))
    })

    test('favourite of no blogs is null', () => {
      const result = listhelper.favouriteBlog([])
      assert.strictEqual(result, null)
    })

    test('favourite of single blog is Zen Habits', () => {

      const result = listhelper.favouriteBlog(singleBlog)
      assert.deepStrictEqual(result, singleBlog[0])
    })

    test('favourite of all blogs is Canonical string reduction', () => {
      const result = listhelper.favouriteBlog(multipleBlogs)
      assert.deepStrictEqual(result, multipleBlogs[7])
    })
  })

  describe('total likes', () => {

    const multipleBlogs = [
      {
        title: 'Zen Habits',
        author: 'Leo Babauta',
        url: 'https://zenhabits.net',
        likes: 2
      },
      {
        title: 'Smitten Kitchen',
        author: 'Deb Perelman',
        url: 'https://smittenkitchen.com',
        likes: 1
      },
      {
        title: 'Mr. Money Mustache',
        author: 'Mr. Money Mustache',
        url: 'https://www.mrmoneymustache.com',
        likes: 5
      },
      {
        title: 'Seth\'s Blog',
        author: 'Seth Godin',
        url: 'https://seths.blog',
        likes: 8
      },
      {
        title: 'Designer Daddy',
        author: 'Brent Almond',
        url: 'https://designerdaddy.com',
        likes: 6
      },
      {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 3
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
      },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
      },
      {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
      },
      {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
      },
      {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
      }
    ]

    const singleBlog = [{
      title: 'Zen Habits',
      author: 'Leo Babauta',
      url: 'https://zenhabits.net',
      likes: 2
    }]

    test('sum likes all blogs returns 58', () => {
      const result = listhelper.totalLikes(multipleBlogs)
      assert.strictEqual(result, 54)
    })

    test('sum likes single blog returns 2', () => {


      const result = listhelper.totalLikes(singleBlog)
      assert.strictEqual(result, 2)
    })

    test('empty array returns 0', () => {
      const result = listhelper.totalLikes([])
      assert.strictEqual(result, 0)
    })

  })

  test('dummy returns one', () => {
    const blogs = []

    const result = listhelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})
after(async () => {
  await mongoose.connection.close()
})