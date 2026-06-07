require('dotenv').config()
const express = require('express')
const Note = require('./models/note')
const { default: mongoose } = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    Note.find({_id: id}).then(notes => 
        response.json(notes)
    )
})

app.put('/api/notes/:id', (request,response) => {
    const id = request.params.id
    const body = request.body
    
    Note.findByIdAndUpdate(id, {important: body.important})
        .then(updatedNote => { 
            console.log('returnedNote', updatedNote),            
            response.json(updatedNote) 
        })
})

app.delete('/api/notes/:id', (request, response) =>{
    const id = request.params.id
    Note.deleteOne({_id: id}).then(deleted =>
        console.log('Deleted', deleted.deletedCount)
    )
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
    
    note.save().then(savedNote => {
        response.json(savedNote)
    })

    
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
