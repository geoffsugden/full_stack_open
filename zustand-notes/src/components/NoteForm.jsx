import { useNoteActions } from '../store'

const NoteForm = () => {
  const { add } = useNoteActions()

  const addNote = async (e) => {
    e.preventDefault()
    const content = e.target.note.value
    add(content)
    e.target.reset()
  }
  return(
    <div>
      <form onSubmit={addNote}>
        <input type="text" name="note" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}
export default NoteForm