import { useAnecdoteActions } from '../stores/anecdoteStore'
import { useNotificationActions } from '../stores/notificationStore'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleAddAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.content.value
    addAnecdote(content)
    setNotification(`You added '${content}'`)
    e.target.reset()
  }
  
  return (
    <div>  
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input type="text" name="content"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm