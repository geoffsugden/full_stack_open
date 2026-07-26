import { create } from 'zustand'
import noteService from './services/notes'

const useNoteStore = create((set, get) => ({
  notes: [],
  filter: 'all', 
  actions: {
    add: async (content) => { 
      const newNote = await noteService.createNew(content)
      set(state => ({ notes: state.notes.concat(newNote) }))
    }, 
    initialize: async () => {
      const notes = await noteService.getAll()
      set(() => ({ notes }))
    },
    toggleImportance: async(id) => {
      const note = get().notes.find(n => n.id === id)
      const updated = await noteService.update(
        id, { ...note, important: !note.important }
      )
      set(state => ({
        notes: state.notes.map(n => n.id === id ? updated : n )
      }))
    },
    toggleImportances: id => set(
      state => ({
        notes: state.notes.map(note => 
          note.id === id ? { ...note, important: !note.important } : note
        )
      })
    ),
    setFilter: value => set(() => ({filter: value})),
  }, 
}))

export const useNotes = () => {
  const notes = useNoteStore((state) => state.notes)
  const filter  = useNoteStore((state) => state.filter)
  if(filter === 'important') return notes.filter(n => n.important)
  if(filter === 'nonimportant') return notes.filter(n => !n.important)
  return notes
}
export const useNoteActions = () => useNoteStore((state) => state.actions)
