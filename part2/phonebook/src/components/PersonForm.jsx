import { useState } from 'react'

import phoneService from '../services/phonebook'

const PersonForm = ({ setPersons, setNotification }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleChangeName = (e) => setNewName(e.target.value)
  const handleChangeNumber = (e) => setNewNumber(e.target.value)

  const addPerson = (e) => {
    e.preventDefault()

    const newPerson = { name: newName, number: newNumber }

    phoneService.create(newPerson).then(person => {
      setPersons(prev => [...prev, person])
      setNewName('')
      setNewNumber('')

      setNotification({ type: 'success', message: `Added ${newName}` })
    })
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
