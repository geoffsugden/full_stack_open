import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote, getAnecdotes, modifyAnecdote } from '../requests'
import useNotify from './useNotify'



export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotify()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes, 
    retry: 1,
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`Anecdote "${newAnecdote.content}" added`)
      setTimeout(() => setNotification(''), 5_000)
    },
    onError: (e) => {
      setNotification(e.message)
      setTimeout(() => setNotification(''), 5_000)
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: modifyAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
      setNotification(`Voted for anecdote "${updatedAnecdote.content}"`)
      setTimeout(() => setNotification(''), 5_000)
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    updateAnecdote: (anecdote) => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes+1 })
  }
}