require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Phonebook = require('./models/phonebook')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req,res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))    

app.get('/', (request, response) => {
    response.send('<h1>Welcome to the Phonebook App</h1>')
})

app.get('/api/persons', (request,response) => {
    Phonebook.find({}).then(persons =>  {
        response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request,response, next) => {
    Phonebook.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person) 
            } else {
                response.status(404).json({error: 'That is not a valid ID.'})
            }
        })
        .catch(error => next(error))        
})

app.get('/info', (request, response) => {
    const now = new Date()
    Phonebook.countDocuments()
        .then(countDocs => response.send(`<p>Phonebook has info for ${countDocs} people</p><p>${now.toString()}</p>`))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request,response,next) => {
    const id = request.params.id
    Phonebook.deleteOne({_id: id})
        .then(deleted => 
            response.status(204).json({
                message: `Deleted ${deleted.deletedCount} record`})
        )
        .catch(error => next(error))
})

app.post('/api/persons', (request,response,next) => {
    const {name, number} = request.body
    
    if (!name || !number) {
        return response.status(409).json({
            error: 'name and number are required fields.'
        })
    }

    const person = new Phonebook({
        name: name,
        number: number,
    })
    
    person.save()
        .then(person => {
            response.json(person)    
        })
        .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body

    console.log('We get here? Probably not');
    
    Phonebook.findById(request.params.id)
        .then(person => { 
            if(!person) { 
                return response.status(404).end()
            }
            person.name = name
            person.number = number

            return person.save().then(updatedPerson => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error('I\'m a little error: ', error.message)

    if (error.name === 'CastError') {
        return response.status(404).send({ error: 'malformed id'})
    }
    next(error)
}

// handler of requests that result in an error
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);  
})