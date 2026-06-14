const { test, describe } = require('node:test')
const assert = require('node:assert')
const listhelper = require('../utils/list_helper')

describe('most blogs', () => {
  const multipleBlogs = [
    {
      title: 'Zen Habits',
      author: 'Leo Babauta',
      url: 'https://zenhabits.net',
      likes: 2,
      id: '6a2a72f5f67bc01b6cf0205b'
    },
    {
      title: 'Smitten Kitchen',
      author: 'Deb Perelman',
      url: 'https://smittenkitchen.com',
      likes: 1,
      id: '6a2a7399f67bc01b6cf0205c',
      __v:0
    },
    {
      title: 'Mr. Money Mustache',
      author: 'Mr. Money Mustache',
      url: 'https://www.mrmoneymustache.com',
      likes: 5,
      id: '6a2a73a8f67bc01b6cf0205d',
      __v:0
    },
    {
      title: 'Seth\'s Blog',
      author: 'Seth Godin',
      url: 'https://seths.blog',
      likes: 8,
      id: '6a2a73b7f67bc01b6cf0205e',
      __v:0
    },
    {
      title: 'Designer Daddy',
      author: 'Brent Almond',
      url: 'https://designerdaddy.com',
      likes: 6,
      id: '6a2a7491f67bc01b6cf02060',
      __v:0
    },
    {
      id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  const singleBlog = [{
    title: 'Zen Habits',
    author: 'Leo Babauta',
    url: 'https://zenhabits.net',
    likes: 2,
    id: '6a2a72f5f67bc01b6cf0205b'
  }]

  test('most blogs of empty list is null', () => {
    const result = listhelper.mostBlogs([])
    assert.deepStrictEqual(result, null)
  })

  test('most liked author of single blog is Leo Babauta', () => {
    const result = listhelper.mostBlogs(singleBlog)
    assert.deepStrictEqual(result, { author: 'Leo Babauta', blogs: 1 })
  })

  test('most blogs from on author is Robert C. Martin', () => {
    const result = listhelper.mostBlogs(multipleBlogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})


describe('most liked author', () => {
  const multipleBlogs = [
    {
      title: 'Zen Habits',
      author: 'Leo Babauta',
      url: 'https://zenhabits.net',
      likes: 2,
      id: '6a2a72f5f67bc01b6cf0205b'
    },
    {
      title: 'Smitten Kitchen',
      author: 'Deb Perelman',
      url: 'https://smittenkitchen.com',
      likes: 1,
      id: '6a2a7399f67bc01b6cf0205c',
      __v:0
    },
    {
      title: 'Mr. Money Mustache',
      author: 'Mr. Money Mustache',
      url: 'https://www.mrmoneymustache.com',
      likes: 5,
      id: '6a2a73a8f67bc01b6cf0205d',
      __v:0
    },
    {
      title: 'Seth\'s Blog',
      author: 'Seth Godin',
      url: 'https://seths.blog',
      likes: 8,
      id: '6a2a73b7f67bc01b6cf0205e',
      __v:0
    },
    {
      title: 'Designer Daddy',
      author: 'Brent Almond',
      url: 'https://designerdaddy.com',
      likes: 6,
      id: '6a2a7491f67bc01b6cf02060',
      __v:0
    },
    {
      id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

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
    const result = listhelper.mostLikes(multipleBlogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})

describe('favourite Blog', () => {
  const multipleBlogs = [
    {
      title: 'Zen Habits',
      author: 'Leo Babauta',
      url: 'https://zenhabits.net',
      likes: 2,
      id: '6a2a72f5f67bc01b6cf0205b'
    },
    {
      title: 'Smitten Kitchen',
      author: 'Deb Perelman',
      url: 'https://smittenkitchen.com',
      likes: 1,
      id: '6a2a7399f67bc01b6cf0205c',
      __v:0
    },
    {
      title: 'Mr. Money Mustache',
      author: 'Mr. Money Mustache',
      url: 'https://www.mrmoneymustache.com',
      likes: 5,
      id: '6a2a73a8f67bc01b6cf0205d',
      __v:0
    },
    {
      title: 'Seth\'s Blog',
      author: 'Seth Godin',
      url: 'https://seths.blog',
      likes: 8,
      id: '6a2a73b7f67bc01b6cf0205e',
      __v:0
    },
    {
      title: 'Designer Daddy',
      author: 'Brent Almond',
      url: 'https://designerdaddy.com',
      likes: 6,
      id: '6a2a7491f67bc01b6cf02060',
      __v:0
    },
    {
      id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
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
      likes: 2,
      id: '6a2a72f5f67bc01b6cf0205b'
    },
    {
      title: 'Smitten Kitchen',
      author: 'Deb Perelman',
      url: 'https://smittenkitchen.com',
      likes: 1,
      id: '6a2a7399f67bc01b6cf0205c',
      __v:0
    },
    {
      title: 'Mr. Money Mustache',
      author: 'Mr. Money Mustache',
      url: 'https://www.mrmoneymustache.com',
      likes: 5,
      id: '6a2a73a8f67bc01b6cf0205d',
      __v:0
    },
    {
      title: 'Seth\'s Blog',
      author: 'Seth Godin',
      url: 'https://seths.blog',
      likes: 8,
      id: '6a2a73b7f67bc01b6cf0205e',
      __v:0
    },
    {
      title: 'Designer Daddy',
      author: 'Brent Almond',
      url: 'https://designerdaddy.com',
      likes: 6,
      id: '6a2a7491f67bc01b6cf02060',
      __v:0
    },
    {
      id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  const singleBlog = [{
    title: 'Zen Habits',
    author: 'Leo Babauta',
    url: 'https://zenhabits.net',
    likes: 2,
    id: '6a2a72f5f67bc01b6cf0205b'
  }]

  test('sum likes all blogs returns 58', () => {
    const result = listhelper.totalLikes(multipleBlogs)
    assert.strictEqual(result, 58)
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
