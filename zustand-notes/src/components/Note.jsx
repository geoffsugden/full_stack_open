import { useNoteActions } from '../store'

const Note = ({ note }) => {
  const { toggleImportance } = useNoteActions()
  
  return (
    <li>
      {note.important ? <strong>{note.content}</strong> : note.content}
      <button onClick={() => toggleImportance(note.id)}>
        {note.important ? 'make not important' : 'make important '}
      </button>
    </li>
  )
}
export default Note