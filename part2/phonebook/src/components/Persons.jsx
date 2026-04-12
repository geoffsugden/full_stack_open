import PhoneBookService from '../services/phonebook'
const Persons = ({persons, setPersons, filterValue, setMessage}) => {
  
  const personsToShow = filterValue.length ? persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())) : persons
  
  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name}`)
    if (result) {
      PhoneBookService.delRecord(id) 
        .then(response => setPersons(persons.filter(person => person.id !== response.id)))
        setMessage({messageValue: `${person.name} has been deleted.`, messageType: 'message'})
            setTimeout(() => {setMessage({messageValue: null, messageType: null})},3000)
            setPersons(personsToShow.filter(person => person.id !== id))
        .catch(
          error => {
            setMessage({messageValue: `${person.name} does not exist on server. They may have been deleted.`, messageType: 'error'})
            setTimeout(() => {setMessage({messageValue: null, messageType: null})},3000)
            setPersons(personsToShow.filter(person => person.id !== id))
          }
        )
    }

  }
  return (
    <div>
      {personsToShow.map(person => <div key={person.name}>
        {person.name} {person.number} &nbsp;&nbsp;
        <button onClick={() => removePerson(person.id)} >delete</button>
      </div>)}

    </div>
  )
}

export default Persons



