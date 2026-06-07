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
})

app.get('/api/persons/:id', (request,response) => {
    const id = request.params.id
    Phonebook.findOne({_id: id})
        .then(person => {
            if (person) {
                response.json(person) 
            } else {
                response.status(404).json({error: 'That is not a valid ID.'})
            }
        })
        .catch(error => console.log('Error: ', error))
        
})

app.get('/info', (request, response) => {
    const now = new Date()
    Phonebook.countDocuments()
        .then(countDocs => response.send(`<p>Phonebook has info for ${countDocs} people</p><p>${now.toString()}</p>`))
})

app.delete('/api/persons/:id', (request,response) => {
    const id = request.params.id
    Phonebook.deleteOne({_id: id})
        .then(deleted => 
            response.status(204).json({
                message: `Deleted ${deleted.deletedCount} record`})
        )
})

app.post('/api/persons', (request,response) => {
    const body = request.body
    
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'name missing'
        })
    } 

    const newPerson = new Phonebook({
        name: body.name,
        number: body.number,
    })

    newPerson.save(newPerson)
        .then(person => {
            response.json(person)    
        })
        .catch(error => {
                response.status(409).json({
                    error: 'Person already exists in phonebook.'
                })          
                console.log('Error adding person: ', error);
        })

    
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    
})