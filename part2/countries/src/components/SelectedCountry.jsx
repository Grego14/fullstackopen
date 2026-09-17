import { useEffect, useState } from 'react'

import wheaterService from '../services/wheater'

export default function SelectedCountry({ country }){
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  const { languages: langs = {}, area, capital, flags, name, latlng } = country ?? {}
  const languages = Object.values(langs)

  const iconData = weather?.weather?.[0]
  const { icon, description } = iconData ?? {}

  useEffect(() => {
    if(name?.common){
      setLoading(true)

      wheaterService.getWeather(latlng)
        .then(data => {
          setWeather(data)
          setLoading(false)
        })
    }
  }, [country])

  if(!country?.name) return null

  return (
    <div>
      <h2>{name.common}</h2>
      <div className='country-stats'>
        <span>Area: {area}</span>
        <span>Capital: {capital?.[0] ?? 'none'}</span>
      </div>

      <h3>Languages</h3>
      <ul className='country-languages'>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>

      <div className='country-flag'>
        <img 
          alt={flags.alt} 
          src={flags.svg} 
          width='300' 
          height='300' 
        />
      </div>

      <h3>Weather in {name.common}</h3>

      <div>
        {loading 
          ? <p>Loading weather status...</p> 
          : (
            <div className='weather-stats'>
              <span>Temperature: {weather?.main.temp} Celcius</span>
              {icon && (
                <img 
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt={description} 
                  width='100'
                  height='100'
                />
              )}
              <span>Wind: {weather?.wind.speed} m/s</span>
            </div>
          )}
      </div>
    </div>
  )
}
