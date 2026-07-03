import { useState, useEffect, use } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import DisplayNote from './components/DisplayNote'
import Notification from './components/Notification'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState ('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
    
  }, [])
  
  const handleAddNote = (content) => {
    const noteObject = {
      content: content, 
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }
  const deleteNote = (id) => {
    const note = notes.find(n => n.id === id)

    noteService
      .delNote(id)
      .then(response => {
        setNotes(notes.filter(n => n.id != id))
      })
  }


  const toggleImportonceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? changedNote : note))
    })
    .catch(error => {
      setErrorMessage( 
        `The note '${note.content}' was already deleted from the server`,
        console.error('Error is', error)
        
      )
      setTimeout(() => {setErrorMessage(null)},5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && (
        <LoginForm
          onLoginSuccess={setUser}
          setErrorMessage={setErrorMessage}
        />
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <NoteForm onNoteAdded={handleAddNote} />
        </div>
      )}

      <br />
      <div><button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'} </button></div>
      <ul>
        {notesToShow.map(note => 
          <DisplayNote 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportonceOf(note.id)}
            deleteNote={() => deleteNote(note.id)} 
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}
export default App
