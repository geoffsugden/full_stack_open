import { useState } from 'react'
import PhoneBookServices from '../services/phonebook'

const PersonForm = ({persons, addPerson}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName.trim(), 
      number: newNumber.trim()
    }
    if (persons.find((person) => person.name === newPerson.name)) {
      alert(`${newName} already exists!`)
    } else {
      PhoneBookServices.create(newPerson)
        .then(addPerson(persons.concat(newPerson)))
    }
    setNewName('')
    setNewNumber('')
  }

    return (
        <form>
        <div>name:<input value={newName} onChange={handleNameChange}/></div>
        <div>number:<input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit" onClick={handleAddPerson}>add</button></div>
        </form>
    )
}

export default PersonForm