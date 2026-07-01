import { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'

/* eslint-disable react/prop-types */
const NoteForm = ({ onNoteAdded }) => {
  const [newNote, setNewNote] = useState('a new note...')

  const addNote = (event) => {
    event.preventDefault()
    
    onNoteAdded(newNote)

    setNewNote('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange}/>
      <button type='submit'>save</button>
    </form>
  )
}

export default NoteForm