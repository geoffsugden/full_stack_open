const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, {family: 4})
    .then(result => {
        console.log('Connected to mongo - phonebook database server')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB: ', error.message);
        
    })

const phonebookSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true },
    number: String,
}, { collection: 'phonebook'})


phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)