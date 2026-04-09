import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterValue, setFilterValue] = useState('')

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
      <Filter setFilter={setFilterValue} />
      
      <h3>Add a new person</h3>
      <PersonForm addPerson={setPersons} persons={persons} />

      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue} />

    </div>

  )
}

export default App