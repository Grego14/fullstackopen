const Filter = ({ setFilter, filter }) => {
  const handleFilterChange = (e) => setFilter(e.target.value.toLowerCase())

  return (
    <label>
      filter shown with:
      <input type='text' value={filter} onChange={handleFilterChange}/>
    </label>
  )
}

export default Filter
