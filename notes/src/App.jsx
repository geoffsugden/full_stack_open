import { useState, useEffect, useRef } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import DisplayNote from './components/DisplayNote'
import Notification from './components/Notification'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import Togglable from './components/Togglable'

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const noteFormRef = useRef()

  const handleAddNote = (content) => {
    noteFormRef.current.toggleVisibilty()
    noteService
      .create(content)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }
  const deleteNote = (id) => {
    const note = notes.find(n => n.id === id)

    noteService
      .delNote(id)
      .then(response => {
        setNotes(notes.filter(n => n.id !== id))
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

  const handleLogout = () => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && (
        <Togglable buttonLabel='Log in'>
          <LoginForm
            onLoginSuccess={setUser}
            setErrorMessage={setErrorMessage}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <form onSubmit={handleLogout}>
            <button type="submit">logout</button>
          </form>
          <Togglable buttonLabel='New Note' ref={noteFormRef}>
            <NoteForm onNoteAdded={handleAddNote} />
          </Togglable>
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
