import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PhoneBookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    PhoneBookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilterValue} />
      
      <h3>Add a new person</h3>
      <PersonForm addPerson={setPersons} persons={persons} />

      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filterValue={filterValue} />

    </div>

  )
}

export default App