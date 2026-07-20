import { create } from 'zustand'

const useNoteStore = create((set) => ({
  notes: [],
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
  }
}))

export const useNotes = () => useNoteStore((state) => state.notes)
export const useNoteActions = () => useNoteStore((state) => state.actions)
