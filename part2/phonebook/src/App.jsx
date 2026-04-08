import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '021 123 456' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

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
    persons.find((person) => person.name === newPerson.name) ? alert(`${newName} already exists!`) : setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const filterPersons = (event) => {
    setFilterValue(event.target.value.toLowerCase())
  }

  const personsToShow = filterValue.length ? persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())) : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter shown with <input onChange={filterPersons} /></div>
      <h3>Add a new person</h3>
      <form>
        <div>name:<input value={newName} onChange={handleNameChange}/></div>
        <div>number:<input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit" onClick={handleAddPerson}>add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>{personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}</div>
    </div>

  )
}

export default App