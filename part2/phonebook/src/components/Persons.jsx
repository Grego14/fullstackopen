import { useState } from 'react'

import phoneService from '../services/phonebook'

const Persons = ({ persons, setPersons, filter }) => {
  const [lastCopied, setLastCopied] = useState('')

  const handleCopy = async (number) => {
    try{
      await navigator.clipboard.writeText(number)
      setLastCopied(number)
    } catch (e) {
      alert("Could't copy the number. Try again")
    }
  }

  const handleDeletion = async (id) => {
    const person = persons.find(person => person.id === id)
    if(!person) return

    const removePerson = confirm(`Delete ${person.name}`)
    if(!removePerson) return

    phoneService.remove(id).then((state) => {
      console.log(state)

      if(id === lastCopied) setLastCopied('')

      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const getCopyLabel = (number) => number === lastCopied ? 'copied!' : 'copy'

  return (
    persons
    .filter(person => person.name.toLowerCase().match(filter))
    .map(person => (
      <p key={person.name}>
        {person.name}{':'}
        <span className='person-number'>{person.number}</span>
        <button type='button' className='person-action' onClick={() => handleCopy(person.number)}>
          {getCopyLabel(person.number)}
        </button>
        <button className='person-action' type='button' onClick={() => handleDeletion(person.id)}>
          {'delete'}
        </button>
      </p>
    )
  ))
}

export default Persons
