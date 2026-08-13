const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const createNew = async (object) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const deleteOne = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' })

  if (!response.ok) {
    throw new Error('Failed to delete anecdote')
  }

  return await response.json()
} 

export default { getAll, createNew, deleteOne }