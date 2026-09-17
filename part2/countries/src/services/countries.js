import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () => {
  const req = axios.get(`${baseUrl}/all`)
  return req.then(res => res.data)
}

const get = async (country) => {
  const req = axios.get(`${baseUrl}/name/${country}`)
  return req.then(data => console.log(data))
}

export default { getAll, get }
