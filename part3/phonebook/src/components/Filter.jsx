const Filter = ({setFilter}) => {
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>Filter shown with <input onChange={handleFilter} /></div>
  )
}

export default Filter