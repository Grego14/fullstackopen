import express from 'express'
import morgan from 'morgan'

const app = express()
const PORT = 3001

const requestLogger = (req, _res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

morgan.token('post', function (req, _res) {
  return JSON.stringify(req.body)
})

app.use(
  express.json(),
  express.static('dist'),
  requestLogger, 
  morgan(':method :url :status :res[content-length] - :response-time ms :post')
)

app.get('/', (_req, res) => {
  res.send('<h1>Hello World!</h1>')
})

const generateId = () => {
  const id = String(Math.floor(Math.random() * 256)) 
    + String(Math.floor(Math.random() * 256)) 
    + String(Math.floor(Math.random() * 256))

  return id
}

let phonebook = [
  { 
    "id": generateId(),
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": generateId(),
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": generateId(),
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": generateId(),
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (_req, res) => {
  res.send(phonebook)
})

app.get('/info', (_req, res) => {
  const quantity = phonebook.length

  res.send(`Phonebook has info for ${quantity} people
    ${new Date().toString()}`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = phonebook.find(person => person.id === id)

  if(person) {
    res.json(person)
  } else {
    res.statusMessage = "Couldn't find that person on the phonebook"
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  phonebook = phonebook.filter(person => person.id !== id)

  res.status(204).end()
})

const ERRORS = {
  MISSING_NAME: 'name is missing',
  MISSING_NUMBER: 'number is missing',
  NAME_EXISTS: 'name must be unique'
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  const { name, number } = body

  if(!name) return res.status(404).json({ error: ERRORS.MISSING_NAME })
  if(!number) return res.status(404).json({ error: ERRORS.MISSING_NUMBER })

  const person = phonebook
    .find(person => person.name.toLowerCase() === name.toLowerCase())

  if(person) 
    return res.status(400).json({ error: ERRORS.NAME_EXISTS })

  const newPerson = {
    id: generateId(),
    name,
    number
  }

  phonebook = phonebook.concat(newPerson)
  console.log(newPerson)
  res.json(newPerson)
})

const unknownEndpoint = (_re, res) => 
  res.status(404).send({ error: 'unknown endpoint' })

app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
