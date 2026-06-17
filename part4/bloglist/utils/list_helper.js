const lodash = require('lodash')

/**
 * returns the author whose blog posts have the largest amount of likes.
 * The return value also contains the total number of likes that the author has received.
 * @param {*} blogs The array of blogs - must be an array of length zero or more.
 * @returns object containing The name of the author that has the most likes across all blogs and the total number of likes they have.
 */
const mostLikes = (blogs) => {
  if(blogs.length === 0) {
    return null
  }

  const groupedByAuthor = lodash.groupBy(blogs, 'author')

  const authorTotals = lodash.map(groupedByAuthor, (authorLikes, authorName) => ({
    author: authorName,
    likes: lodash.sumBy(authorLikes, 'likes')
  }))

  return lodash.maxBy(authorTotals, 'likes')

}

/**
 * Returns the name of the single author that has published the most blogs from the array of blogs passed in as parameter.
 * If multiple authors are tied for this metric one of those authors will be returned.
 * Returns null if an empty array is passed and will error if no array is passed.
 * @param {*} blogs The array of blogs - must be an array of length zero or more.
 * @returns Object The name of the author that has published the most blogs and count of blogs published
 */
const mostBlogs = (blogs) => {
  if(blogs.length === 0) {
    return null
  }
  const countBlogs = lodash.countBy(blogs, 'author')
  const bloggerArray = Object.entries(countBlogs).map(([author, blogs]) => ({
    author,
    blogs,
  }))
  return lodash.maxBy(bloggerArray, 'blogs')
}

/**
 * Determines the single blog with the most likes. Will error if an empty array is passed.
 * If multiple blogs are tied for the most likes the one of these blogs will be returned.
 * @param {*} blogs The array of blogs - must be an array of length zero or more.
 * @returns The single blog with the most likes.
 */
const favouriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return null
  }
  return blogs.reduce((mostLikedBlog, curBlog) => curBlog.likes > mostLikedBlog.likes ? curBlog : mostLikedBlog)
}

/**
 * Returns the sum of all likes for the array of all blogs passed as the parameter.
 * Returns 0 if an empty array is passed and will error if no array is passed.
 * @param {*} blogs The array of blogs - must be an array of length zero or more.
 * @returns integer that is the sum of all likes across the array of blogs passed in.
 */
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}


/**
 * A test for the tests. If this fails then our tests are serisouly wrong.
 * @param {*} blogs expected to be null or an empty array
 * @returns 1 - always
 */
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  // returns 1, doesn't matter what you give it.
  return 1
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
