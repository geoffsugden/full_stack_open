const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const db_user = 'geoffsugden_db_user'
const db_password = process.argv[2]
const db_name = 'noteApp'
const url = `mongodb://${db_user}:${db_password}@ac-koqzjed-shard-00-00.fwcdt3n.mongodb.net:27017,ac-koqzjed-shard-00-01.fwcdt3n.mongodb.net:27017,ac-koqzjed-shard-00-02.fwcdt3n.mongodb.net:27017/${db_name}?ssl=true&replicaSet=atlas-12ibee-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, {family : 4})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })