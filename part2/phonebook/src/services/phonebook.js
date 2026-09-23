import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = async () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async (newEntry) => {
  const req = axios.post(baseUrl, newEntry)
  return req.then(res => res.data)
}

/**
 * @returns true if the deletion was sucessfull, false otherwise
*/
const remove = async (id) => {
  try {
    axios.delete(`${baseUrl}/${id}`)
    return true
  } catch (_){
    return false
  }
}

export default { getAll, create, remove }
