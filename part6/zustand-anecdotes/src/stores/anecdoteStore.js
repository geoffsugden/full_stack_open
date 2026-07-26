
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import anecdoteService from '../services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    addAnecdote: async (anecdoteContent) => {
      const newAnecdote = await anecdoteService.createNew(anecdoteContent)
      set(state => ({anecdotes: state.anecdotes.concat(newAnecdote)}))
    },
    deleteAnecdote: async (id) => {
      await anecdoteService.remove(id)
      set(state => ({ anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)}))
    },
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(({ anecdotes }))
    },
    setFilter: value => set(() => ({ filter: value })),
    vote: async (id) => {
      const toUpdate = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(id, { ...toUpdate, votes: toUpdate.votes + 1})
      set(state => ({anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? updated : anecdote)}))
    }
  },
}))

export const useAnecdotes = () => useAnecdoteStore(useShallow((state) => {
    const filter = state.filter.toLowerCase()
    return state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
      .toSorted((a, b) => b.votes - a.votes)
  }
))
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
