import 'dotenv/config'

import express from 'express'
import morgan from 'morgan'

import { Person } from './models/person.js'

const app = express()
const PORT = process.env.PORT

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

app.get('/api/persons', (_req, res) => {
  Person.find({}).then(people => {
    console.log(people.map(person => person.toJSON()))
    res.json(people.map(person => person.toJSON()))
  })
})

app.get('/info', (_req, res) => {
  Person.find({}).then(result => {
    const quantity = result.length

    res.send(`Phonebook has info for ${quantity} people ${new Date().toString()}`)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => res.json(person.toJSON()))
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.deleteOne({ _id: id }).then(() => res.status(204).end())
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

  const newPerson = new Person({ name, number })

  newPerson.save(newPerson).then(savedPerson => {
    console.log(savedPerson.toJSON())
    res.json(newPerson.toJSON())
  })
})

const unknownEndpoint = (_re, res) => 
  res.status(404).send({ error: 'unknown endpoint' })

app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
