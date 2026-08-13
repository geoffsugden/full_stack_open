import { useNavigate } from 'react-router-dom'
import { useField, useAnecdotes } from '../hooks'

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addAnecdote({ 
      content: content.fieldAttributes.value, 
      author: author.fieldAttributes.value, 
      info: info.fieldAttributes.value, 
      votes: 0 
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' { ...content.fieldAttributes } />
        </div>
        <div>
          author
          <input name='author' { ...author.fieldAttributes } />
        </div>
        <div>
          url for more info
          <input name='info' { ...info.fieldAttributes } />
        </div>
        <button>create</button>
        <button onClick={(e) => handleReset(e)}>reset</button>
      </form>
      
    </div>
  )
}

export default CreateNew
