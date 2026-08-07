import { useAnecdotes } from './hooks/useAnecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const { anecdotes, isPending, isError, updateAnecdote } = useAnecdotes()

  if(isPending) {
    return <div>anecdotes arriving shortly...</div>
  }

  if(isError) {
    return <div>anecdotes are not available (due to server error) please try again later</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => updateAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App