import { useState, useEffect } from 'react'
import Country from './components/Countries'
import CountriesService from './services/countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState(null)

  useEffect(() => {
    if (countries.length === 0) {
      CountriesService
        .getAll()
        .then(countries => {
          setCountries(countries)
        })
    }
  },[])

  const filterCountries = (event) => {
    setFilterValue(event.target.value)
  }

  const countriesToShow = filterValue ? countries.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase())) : countries  
  
  const fullName = () => {
    let cMatch = false
    for(cName in countriesToShow.map(country => country.common.name)) {
      if (cMatch) { break}
      if(cName === filterValue && filterValue.Trim().length > 0) {
        cMatch = true
      }
    }
    return cMatch
  }

  return (
    <div>
      <h2>Stuff about Countries</h2>
      <input onChange={filterCountries}></input>
      
      
      {countriesToShow.length > 10 && <p>Too many countries, please make your search term more specific.</p>}
      {countriesToShow.length === 1 && countriesToShow.map(country => <Country key={country.cca3} country={country} showButton={false}/>)}
      {countriesToShow.length >1 && countriesToShow.length <10 && countriesToShow.map(country => <Country key={country.cca3} country={country} showButton={true}/>)} 
    </div>

  )
}

export default App
