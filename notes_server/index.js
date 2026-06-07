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

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
    .then(note => {
        if (note) {
            response.json(note) 
        } else {
            response.status(404).send('Where did we go wrong')
        }
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request,response) => {
    const { content, important } = request.body
    
    Note.findById(request.params.id)
        .then(note => { 
            if(!note) {
                return response.status(404).end()
            }
            
            note.content = content
            note.important = important

            return note.save().then((updatedNote) => {
                response.json(updatedNote)
            })
        })
        .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response) =>{
    Note.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
    
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


const unknwonEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
}

// handler of requests with unknown endpoint
app.use(unknwonEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id'})
    }
    next(error)
}

// handler of requests that result in errors. 
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

