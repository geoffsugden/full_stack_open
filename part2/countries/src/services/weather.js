import axios, { all } from 'axios'
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q='

const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key now has the value set in startup

const getWeather = (country,capital) => {

    const request = axios.get(`${baseUrl}${capital},${country}&APPID=${api_key}&units=metric`)
    return request.then(response => response.data)
}



export default {getWeather}