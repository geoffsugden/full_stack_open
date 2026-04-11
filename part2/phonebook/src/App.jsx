import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterValue, setFilterValue] = useState('')
  const [messageValue, setMessageValue] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageValue={messageValue} />
      <Filter setFilter={setFilterValue} />
      
      <h3>Add a new person</h3>
      <PersonForm addPerson={setPersons} persons={persons} setMessageValue={setMessageValue} />

      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue} setMessageValue={setMessageValue}/>

    </div>

  )
}

export default App