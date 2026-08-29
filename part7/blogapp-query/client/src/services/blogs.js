import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const updateBlogListing = async (blogListing) => {
  const config = { headers: { Authorization: token } }
  const url = `${baseUrl}/${blogListing.id}`
  const response = await axios.put(url, blogListing, config)
  return response.data
}

const likeBlog = async (blog) => {
  const config = { headers: { Authorization: token } }
  const url = `${baseUrl}/${blog.id}/like`
  const response = await axios.put(url, blog, config)
  return response.data
}

const addComment = async (blog) => {
  const config = { headers: { Authorization: token } }
  const url = `${baseUrl}/${blog.id}/comment`
  const response = await axios.put(url, blog, config)
  return response.data
}

const createBlogListing = async (blogListing) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blogListing, config)
  return response.data
}

const removeBlog = async (blogId) => {
  const config = { headers: { Authorization: token } }
  await axios.delete(`${baseUrl}/${blogId}`, config)
  return blogId
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll, setToken, createBlogListing, updateBlogListing, removeBlog, likeBlog, addComment }
