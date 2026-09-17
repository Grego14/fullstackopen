import { useState, useEffect } from 'react'

import Search from './components/Search'
import MatchedCountries from './components/MatchedCountries'
import SelectedCountry from './components/SelectedCountry'

import countriesService from './services/countries'

import './App.css'

function App() {
  const [filter, setFilter] = useState('')
  const [showingCountry, setShowingCountry] = useState(null)
  const [countries, setCountries] = useState(null)
  const [matchedCountries, setMatchedCountries] = useState(null)

  useEffect(() => {
    countriesService.getAll()
      .then(countries => setCountries(countries))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if(countries){
      const match = countries.filter(country => 
        country.name.common.toLowerCase().match(filter)
      )

      if(match.length > 0) {
        if(filter) {

          // automatically set the showing country to be the only match
          if(match.length === 1) {
            setShowingCountry(match[0])
          } else {
            setShowingCountry(null)
          }

          setMatchedCountries(match)
          return
        }

        setMatchedCountries(null)
        setShowingCountry(null)
      }
    }
  }, [filter])

  console.log(filter, matchedCountries, showingCountry, countries)

  return (
    <main>
      <section>
        <Search 
          filter={filter} 
          setFilter={setFilter} 
          countries={countries} 
        />
      </section>

      <section>
        <MatchedCountries 
          countries={matchedCountries} 
          setShowCountry={setShowingCountry} 
          selectedCountry={showingCountry?.name?.common}
        />
      </section>

      <section>
        <SelectedCountry country={showingCountry} />
      </section>
    </main>
  )
}

export default App
