import PhoneBookService from '../services/phonebook'
const Persons = ({persons, setPersons, filterValue}) => {
  
  const personsToShow = filterValue.length ? persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())) : persons
  
  const removePerson = (id) => {
    const result = window.confirm(`Delete ${persons.find(person => person.id === id).name}`)
    if (result) {
      PhoneBookService.delRecord(id) 
        .then(response => setPersons(persons.filter(person => person.id !== response.id)))
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



