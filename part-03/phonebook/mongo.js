const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length > 5) {
    console.log('Name needs to be put inside ""')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://phonebookbackend:${password}@cluster0.kim2lrz.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook')
        result.forEach(entry => console.log(`${entry.name} ${entry.number}`))
        mongoose.connection.close()
    })
} else {
    const person = new Person({ name: name, number: number })
    person.save().then(result => {
        console.log(`added ${name} number ${number} to the phonebook`)
        mongoose.connection.close()
    })
}