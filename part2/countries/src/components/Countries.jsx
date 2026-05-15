import { useState, useEffect } from 'react'
import WeatherService from '../services/weather'

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
          {capitals.map(capital => <li key={capital}>{capital}</li>) }
        </ul>
      </div>
    )
  } else {
    return null
  }
}

const Weather = ({country, capital}) => {
  const [weather, setWeather] = useState(null)
  const iconUrl = 'https://openweathermap.org/payload/api/media/file/'
  
  useEffect(() => {
    
    if (country && capital) {
      WeatherService.getWeather(country, capital)
        .then(data => {setWeather(data)})

    }
  },[country, capital])
  
  if(weather){ 
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>Temperature: {weather.main.temp} °Celsius</p>
        <img src={`${iconUrl}${weather.weather[0].icon}.png`} alt={weather.weather[0].description} srcSet="" />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )
  } else {
    return (
      <div><p>Loading Weather Data...</p></div>    
    )
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
          {country.capital && country.capital.map(capital => <Weather key={capital} country={country.name.common} capital={capital}/>)}
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

export default Country