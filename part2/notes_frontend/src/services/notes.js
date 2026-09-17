import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const req = axios.get(baseUrl)
  return req.then(response => response.data)
}

const create = async newObject => {
  const req = axios.post(baseUrl, newObject)
  return req.then(response => response.data)
}

const update = async (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(response => response.data)
}

export default { getAll, create, update }
