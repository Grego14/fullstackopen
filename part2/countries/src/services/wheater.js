import axios from 'axios'

const api_key = import.meta.env.VITE_WHEATER_API_KEY
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api}&units=metric'

const getWeather = async (latlon) => {
  const [lat, lon] = latlon
  const url = weatherUrl
    .replace('{lat}', lat)
    .replace('{lon}', lon)
    .replace('{api}', api_key)

  const req = axios.get(url)
  return req.then(res => res.data)
}

export default { getWeather }
