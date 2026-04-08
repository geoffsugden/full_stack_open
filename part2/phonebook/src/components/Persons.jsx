const Persons = ({persons, filterValue}) => {
  
  const personsToShow = filterValue.length ? persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())) : persons

  return (
    <div>{personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}</div>
  )
}

export default Persons



