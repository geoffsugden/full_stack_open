import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleAddName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName.trim()
    }
    persons.find((person) => person.name === newPerson.name) ? alert(`${newName} already exists!`) : setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleAddName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => <div key={person.name}>{person.name}</div>)}</div>
    </div>

  )
}

export default App