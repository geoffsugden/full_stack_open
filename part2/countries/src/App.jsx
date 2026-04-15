import { useState, useEffect } from 'react'
import axios from 'axios'

const Language  = ({languages}) => {
    
  const langValues = Object.values(languages)

  if (langValues.length === 1) {
    return (
      <div>
        <h3>Language</h3>
        <p>{langValues[0]}</p>
      </div>
    )
  } else if (langValues.length > 1) {
    return (
      <div>
        <h3>Languages</h3>
        <ul>
          {langValues.map(language => <li>{language}</li>)}
        </ul>
      </div>
    )
  }

}

const Area = (area) => {
  return (
    <div>
      <p>Area: {area.area}</p>
    </div>
  )
}

const Capital = ({capitals}) => {
  
  if(!capitals) {
    return null
  }

  if (capitals.length === 1) {
    return (
      <div>
        <p>Capital: {capitals[0]}</p>
      </div>
    )
  } else if (capitals.length > 1) {
    return (
      <div>
        <p> Captials </p>
        <ul>
          {capitals.map(capital => <li>{capital}</li>) }
        </ul>
      </div>
    )
  } else {
    return null
  }
}

const Country = ({country}) => {
 
  return (
    <div>
      <h2>{country.name.common}</h2>
      <Capital capitals={country.capital} />
      <Area area={country.area} />
      <Language languages={country.languages} />
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState(null)
  const baseurl = 'https://studies.cs.helsinki.fi/restcountries/'
  const allCountries = 'api/all'
  const filteredCountries = 'api/name/Kuwait'

  useEffect(() => {
    if (countries.length === 0) {
      axios.get(`${baseurl}${allCountries}`)
      .then(response => {
        setCountries(country => countries.concat(response.data))
      })
    }
  },[])

  const filterCountries = (event) => {
    setFilterValue(event.target.value)
  }

  const countriesToShow = filterValue ? countries.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase())) : countries  
  
  return (
    <div>
      <h2>Hello World</h2>
      <input onChange={filterCountries}></input>
      {countriesToShow.length > 10 ? <p>Too many countries, please make your search term more specific.</p> : countriesToShow.map(country => <Country key={country.cca3} country={country} />)} 
    </div>

  )
}

export default App
