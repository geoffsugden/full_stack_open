import { useAnecdoteActions } from '../stores/anecdoteStore'

const AnecdoteFilter = () => { 
  const { setFilter } = useAnecdoteActions()
  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    setFilter(filter)   
  }
  
  const style = { marginBottom: 10 }
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
export default AnecdoteFilter