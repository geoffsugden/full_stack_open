import { useAnecdoteActions, useAnecdotes } from '../stores/anecdoteStore'
import { useNotificationActions } from '../stores/notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, deleteAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()
  

  const handleVote = (anecdote) => {
    vote(anecdote.id)
    setNotification(`You voted for '${anecdote.content}'`)
  }

  const handleDelete = (anecdote) => {
    deleteAnecdote(anecdote.id)
    setNotification(`You deleted '${anecdote.content}'`)
  }

  const style = { marginLeft: 3 }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button style={style} onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && <button style={style} onClick={() => handleDelete(anecdote)}>delete</button>}
          </div>
        </div>
      ))}
    </div>
  )
}
export default AnecdoteList