import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    fieldAttributes: { type, value, onChange },
    reset
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      const data = await anecdoteService.getAll()
      if(!ignore) setAnecdotes(data)
    }
    fetchData()
    
    return () => { ignore = true }
  }, [])

  const addAnecdote = async (anecdote) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    setAnecdotes(prev => prev.concat(newAnecdote))
  }

  const deleteAnecdote = async (anecdote) => {
    await anecdoteService.deleteOne(anecdote.id)
    setAnecdotes(prev => prev.filter(a => a.id !== anecdote.id))
  }

  return ({
    anecdotes,
    addAnecdote, 
    deleteAnecdote
  })
}



