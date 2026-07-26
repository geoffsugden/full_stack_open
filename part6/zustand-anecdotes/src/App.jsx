import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useEffect } from 'react'
import { useAnecdoteActions } from './stores/anecdoteStore'
import { useNotification } from './stores/notificationStore' 

const App = () => {
  const { initialize } = useAnecdoteActions()
  const notification = useNotification()
  
  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification notification={notification}/>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App