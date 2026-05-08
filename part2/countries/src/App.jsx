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
          {langValues.map(language => <li key={language}>{language}</li>)}
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

const CountryInfo = ({country}) => {
      return ( 
        <div>
          <h2>{country.name.common}</h2>
          <Capital capitals={country.capital}/> 
          <Area area={country.area} /> 
          <Language languages={country.languages} /> 
          <img src={country.flags.png} alt={country.flags.alt} /> 
        </div>
      )
}

const Country = ({country,showButton}) => {
  const [showCountry, setShowCountries] = useState(false)

  const handleShowCountry = (event) => {
    setShowCountries(!showCountry)
  }

  return (
    <div>
      
      {showButton ? country.name.common : ''} {showButton ? <button onClick={handleShowCountry}>{showCountry ? 'Hide' : 'Show'}</button> : ''}
      {showCountry || !showButton ? <CountryInfo key={country.cca3} country={country} /> : '' }
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
