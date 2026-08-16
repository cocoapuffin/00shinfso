const persons = ({ persons, filter, onDelete}) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => (
        <li key={person.id}>{person.name} {person.number} <button type="button" onClick ={() => onDelete(person.id, person.name)}>delete</button></li>
      ))}
    </ul>
  )
}

export default persons