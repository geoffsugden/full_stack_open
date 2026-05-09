import axios, { all } from 'axios'
const baseurl = 'https://studies.cs.helsinki.fi/restcountries/'
const allCountries = 'api/all'

const getAll = () => {
    const request = axios.get(`${baseurl}${allCountries}`)
    return request.then(response => response.data)
}

export default {getAll}
