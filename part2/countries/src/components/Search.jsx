export default function Search({ filter, setFilter }) {
  const handleChange = (e) => {
    const value = e.target.value
    setFilter(value)
  }

  return (
    <div className='search-box'>
      <label>
        find countries
        <input type='text' value={filter} onChange={handleChange} placeholder='e.g: Bosnia'/>
      </label>
    </div>
  )
}
