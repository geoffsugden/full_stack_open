const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('please provide arguments in the following order: password, name and phone_number')
    process.exit(1)
}

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const db_user = 'geoffsugden_db_user'
const db_password = process.argv[2]
const db_name = 'phonebook_db'

const url = `mongodb://${db_user}:${db_password}@ac-koqzjed-shard-00-00.fwcdt3n.mongodb.net:27017,ac-koqzjed-shard-00-01.fwcdt3n.mongodb.net:27017,ac-koqzjed-shard-00-02.fwcdt3n.mongodb.net:27017/${db_name}?ssl=true&replicaSet=atlas-12ibee-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family : 4})

const personSchema = new mongoose.Schema({
    name: String, 
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length >= 5) {

    const p_name = process.argv[3]
    const p_phone_number = process.argv[4]
    if (p_name === 'AddAll') {
        Person.insertMany(persons)
            .then(docs => {
                console.log(docs)
                return mongoose.connection.close()
    })

        
    } else {
        const person = new Person({
            name: p_name,
            number: p_phone_number,
        })

        person.save().then(result => {
            console.log(`added ${p_name} number ${p_phone_number}`)
            mongoose.connection.close()
            
        })
    }
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close()
    })
}