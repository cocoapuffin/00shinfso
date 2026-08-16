const filter = ({ filter, setFilter }) => {
  return (
    <div>
      <p>Filter shown with <input value={filter} onChange={event => setFilter(event.target.value)} /></p>
    </div>
  )
}

export default filter