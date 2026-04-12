import { useState } from 'react'
import PhoneBookService from '../services/phonebook'
import Notifications from './Notification'

const PersonForm = ({persons, addPerson, setMessage}) => {
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
    const existingPerson = persons.find((person) => person.name === newPerson.name)
    if (existingPerson) {
      const changeNumber = window.confirm(`${newName} already exists, update number?`)
      
      if (changeNumber) { 
        PhoneBookService.update(existingPerson.id, newPerson)
          .then(response => addPerson(persons.filter(person => person.id !== existingPerson.id).concat(response)))
          .then(() => Notifications.handleMessage({ setMessage:setMessage, mText: `Updated ${newPerson.name}`, mType: 'message', timeout: 5000}))
          
      } else {
        PhoneBookService.update(existingPerson.id, existingPerson)
          .then(response => Notifications.handleMessage({setMessage:setMessage, mText:`${response.name} already exists, no changes made`, mType:'message', timeout: 5000}))
 
      }
    } else {
      PhoneBookService.create(newPerson)
        .then(response => addPerson(persons.concat(response)))
        .then(Notifications.handleMessage({setMessage:setMessage, mText: `Added ${newPerson.name}`, mType: 'message', timeout: 5000}))

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