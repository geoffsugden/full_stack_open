import PhoneBookService from '../services/phonebook'
import Notifications from './Notification'

const Persons = ({persons, setPersons, filterValue, setMessage}) => {
  
  const personsToShow = filterValue.length ? persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())) : persons
  
  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name}`)
    if (result) {
      PhoneBookService.delRecord(id) 
        .then(response => setPersons(persons.filter(person => person.id !== response.id)))
        .then(() => Notifications.handleMessage({
          setMessage:setMessage, 
          mText:`Person ${person.name} has been deleted`, 
          mType:'message', 
          timeout:3000
        }))
        .then(setPersons(personsToShow.filter(person => person.id !== id)))
        .catch(
          error => {
            Notifications.NotificationhandleMessage({
              setMessage: setMessage, 
              mText: `${person.name} does not exist on server. They may have been deleted.`, 
              mType: 'error', 
              timeout:3000
            })
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



