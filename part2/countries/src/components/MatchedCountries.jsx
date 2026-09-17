export default function MatchedCountries({ countries, setShowCountry, selectedCountry }) {
  if(!countries) return null
  if(countries.length >= 10) return <p>Too many matches, specify another filter</p>

  return (
    <div className='matched-countries-box'>
      {countries.map(country => selectedCountry !== country.name.common ? (
        <div key={country.name.common} className='matched-countries-item'>
          <span>{country.name.common}</span>
          <button onClick={() => setShowCountry(country)}>Show</button>
        </div>
      ): null)}
    </div>
  )
}
