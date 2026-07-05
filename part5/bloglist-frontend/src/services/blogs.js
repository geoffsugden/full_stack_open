import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const createBlogListing = async (blogListing) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blogListing, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll, setToken, createBlogListing }