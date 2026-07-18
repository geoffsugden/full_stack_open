import { useState, useEffect } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { AppBar, Container, Toolbar, Button } from '@mui/material'
import NoteList from './components/NoteList'
import Home from './components/Home'
import Footer from './components/Footer'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const match = useMatch('/notes/:id')
  const note = match ? notes.find(note => note.id === match.params.id) : null
  const addNote = noteObject => {
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const hoverStyle = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to="/" sx={hoverStyle}>home</Button>
          <Button color='inherit' component={Link} to="/notes" sx={hoverStyle}>notes</Button>
          <Button color='inherit' component={Link} to="/create" sx={hoverStyle}>new note</Button>
        </Toolbar>
      </AppBar>

      <Notification message={notification} />

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} toggleImportanceOf={toggleImportanceOf} deleteNote={deleteNote}/>} />
        <Route path="/notes" element={<NoteList notes={notes} />} />
        <Route path="/create" element={<NoteForm createNote={addNote}/>} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Container>
  )
}

export default App