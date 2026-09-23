import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const uri = process.env.MONGODB_URI

mongoose.connect(uri, { family: 4 })

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

export { Person }
