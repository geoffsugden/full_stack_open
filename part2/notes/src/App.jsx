import { useState, useEffect } from 'react'
import DisplayNote from './components/DisplayNote'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState ('What are we doing here?')

  useEffect(() => {
    
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
    
  }, [])
  
  const toggleImportonceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
    })
    .catch(error => {
      setErrorMessage( 
        `The note '${note.content}' was already deleted from the server`
      )
      setTimeout(() => {setErrorMessage(null)},5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
    })
    
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div><button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'} </button></div>
      <ul>
        {notesToShow.map(note => 
          <DisplayNote 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportonceOf(note.id)} 
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}
export default App
