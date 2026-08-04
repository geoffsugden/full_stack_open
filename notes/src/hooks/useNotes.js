import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNote, getNotes, updateNote } from '../requests'

export const useNotes = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false,
  })

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })

  const udpateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (updatedNote) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.map(note => note.id === updatedNote.id ? updatedNote : note))
    }
  })

  return {
    notes: result.data,
    isPending: result.isPending,
    addNote: (content) => newNoteMutation.mutate({ content, important: true }),
    toggleImportance: (note) => udpateNoteMutation.mutate({ ...note, important: !note.important }),
  }
}
