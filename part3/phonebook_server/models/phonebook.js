const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { family: 4 })
  .then(console.log('Connected to mongo - phonebook database server'))
  .catch(error => {
    console.log('Error connecting to MongoDB: ', error.message)

  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{4,}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number. Expected format: (2-3 digits, hypen, 4+ digits).`
    },
    minLength: 8
  }
}, { collection: 'phonebook' })


phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)