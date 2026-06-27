const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    id: '6a3cf52c65b8846be995e13b'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    id: '6a3cf52c65b8846be995e13c'
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    id: '6a3cf52c65b8846be995e13d'
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 10,
    id: '6a3cf52c65b8846be995e13e'
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    id: '6a3cf52c65b8846be995e13f'
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    id: '6a3cf52c65b8846be995e140'
  }
]

const otherBlogs = [
  {
    title: 'Zen Habits',
    author: 'Leo Babauta',
    url: 'https://zenhabits.net',
    likes: 2,
    user: '6a3cf33fb5c6a2619ca424c8',
    id: '6a3cf6bd0a6973b0c9a3022e'
  },
  {
    title: 'Smitten Kitchen',
    author: 'Deb Perelman',
    url: 'https://smittenkitchen.com',
    likes: 1,
    user: '6a3cf33fb5c6a2619ca424c9',
    id: '6a3cf6bd0a6973b0c9a3022f'
  },
  {
    title: 'Mr. Money Mustache',
    author: 'Mr. Money Mustache',
    url: 'https://www.mrmoneymustache.com',
    likes: 5,
    user: '6a3cf33fb5c6a2619ca424ca',
    id: '6a3cf6bd0a6973b0c9a30230'
  },
  {
    title: 'Seth\'s Blog',
    author: 'Seth Godin',
    url: 'https://seths.blog',
    likes: 8,
    user: '6a3cf33fb5c6a2619ca424ca',
    id: '6a3cf6bd0a6973b0c9a30231'
  },
  {
    title: 'Designer Daddy',
    author: 'Brent Almond',
    url: 'https://designerdaddy.com',
    likes: 6,
    user: '6a3cf33fb5c6a2619ca424c9',
    id: '6a3cf6bd0a6973b0c9a30232'
  }
]

const initialUsers = [
  {
    username: 'bbb66',
    name: 'Big Bird',
    password: 'testPassword'
  },
  {
    username: 'otg57',
    name: 'Oscar the Grouch',
    password: 'testPassword'
  },
  {
    username: 'gds48',
    name: 'Geoff Sugden',
    password: 'testPassword'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willdeletesoon',
    author: 'alsodeletesoon',
    url: 'http://deleteme.delete',
    likes: 0
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, otherBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}