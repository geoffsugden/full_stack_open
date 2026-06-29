import { useState, useEffect, use } from 'react'
import DisplayNote from './components/DisplayNote'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState ('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
    
  }, [])
  

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

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}> 
        <div>
          <label>
            username
            <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
          </label>
        </div>
        <div>
          <label>
            password
            <input type="text" value={password} onChange={({ target }) => setPassword(target.value)} />
          </label>
        </div>
        <button type="submit">login</button>
      </form>     
  )

  const noteForm = () => (
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
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
