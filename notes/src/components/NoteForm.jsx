import { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'

const NoteForm = ({ onNoteAdded }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()

    onNoteAdded({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={e => setNewNote(e.target.value)} placeholder='This is where the note goes'/>
      <button type='submit'>save</button>
    </form>
  )
}

export default NoteForm