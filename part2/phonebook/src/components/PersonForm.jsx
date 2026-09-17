import { useState } from 'react'

import phoneService from '../services/phonebook'

const PersonForm = ({ persons, setPersons, setNotification }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleChangeName = (e) => setNewName(e.target.value)
  const handleChangeNumber = (e) => setNewNumber(e.target.value)

  const addPerson = (e) => {
    e.preventDefault()

    const exists = persons.find((person => person.name.toLowerCase() === newName.toLowerCase()))

    if(exists){
      const editNumber = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if(!editNumber) return

      const updatedPerson = { ...exists, number: newNumber }

      phoneService.editNumber(exists.id, updatedPerson)
        .then(state => {
          setPersons(persons.map(person => person.id === exists.id ? updatedPerson : person))
          console.log('number was updated ->', state)
        })
        .catch((err) => {
          setNotification({ 
            type: 'error', 
            message: `Information of ${exists.name} has already been removed from the server` 
          })
          console.error(err)
        })
    } else {
      const newPerson = { name: newName, number: newNumber }

      phoneService.create(newPerson).then(person => {
        setPersons(prev => [...prev, person])
        setNewName('')
        setNewNumber('')


        setNotification({ type: 'success', message: `Added ${newName}` })
      })
    }
  }

  return (
    <form onSubmit={addPerson} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label>
        name: 
        <input type='text' value={newName} onChange={handleChangeName} />
      </label>

      <label>
        number: 
        <input type='text' value={newNumber} onChange={handleChangeNumber} />
      </label>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
