import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'






const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '021 123 456' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [filterValue, setFilterValue] = useState('')

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