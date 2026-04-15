import axios from 'axios'



const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(response)
}

