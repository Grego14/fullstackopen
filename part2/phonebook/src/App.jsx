import { useState, useEffect } from 'react'

import phoneService from './services/phonebook'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchBy, setSearchBy] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    phoneService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
    
      <Notification notification={notification} setNotification={setNotification} />
      <Filter filter={searchBy} setFilter={setSearchBy} />

      <h3>add a new</h3>

      <PersonForm 
        setPersons={setPersons} 
        setNotification={setNotification}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} setPersons={setPersons} filter={searchBy} />
    </div>
  )
}

export default App
