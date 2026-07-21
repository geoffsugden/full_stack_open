import { useNotes } from '../store'
import Note from './Note'

const NoteList = () => {
  const notes = useNotes()
  
  return (
    <ul>
      {notes.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  )
}
export default NoteList