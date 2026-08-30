const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('dist')) // use this instead of cors 

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.send(persons)
})

app.get('/info', (request, response) => {
    const num = persons.length 
    const time = new Date()
    const message = `
    Phonebook has info for ${num} people
    ${time}
    `
    response.json(message)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id 
    const person = persons.find(person => person.id === id)
    console.log(id)
    if (person) {
      response.status(200)
      response.json(person)
    }
    else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person=> person.id !== id)
    response.status(204).end()
})

const getID = () => {
    return String(Math.floor(Math.random() * 100000))
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    const exisitingPerson = persons.find(person=> person.name === body.name)
    if(!body.name){
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if(!body.number){
      return response.status(400).json({
        error: 'number missing'
      })
    }
    if(exisitingPerson) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
    const person = {
        id: getID(),
        name: body.name,
        number: body.number
        
    }

    persons = persons.concat(person)

    response.json(person)
    
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})