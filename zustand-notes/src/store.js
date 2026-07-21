import { create } from 'zustand'

const initialNotes = [
    {
      id: 1,
      content: 'Zustand is less complex than Redux',
      important: true,
    }, {
      id: 2,
      content: 'React app benefits from custom hooks',
      important: false,
    }, {
      id: 3,
      content: 'Remember to sleep well',
      important: true,
    }
  ]

const useNoteStore = create((set) => ({
  notes: initialNotes,
  filter: 'all', 
  actions: {
    add: note => set(
      state => ({ notes: [...state.notes, note] })
    ), 
    toggleImportance: id => set(
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
