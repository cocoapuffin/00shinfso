import { useEffect } from 'react'
import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css' 


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

   
  const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
    // setFilter(event.target.value)
  }

  const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
  }

  const handleDelete = (id,name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => 
      {
        setPersons(persons.filter(person => person.id!==id))
        setNotification({
          type:'success',
          text: `Deleted ${name}`
        })
        setTimeout(() => setNotification(null), 5000)
      })
      .catch(()=> {
        setNotification({
          type:'error',
          text: `Information of '${name}' has already been removed from server`
        })
        setTimeout(() => setNotification(null), 5000)
        setPersons(persons.filter(person=>person.id!== id))
      })
    }
  } 
    useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []) 

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person=>person.name === newName)
    
    if(existingPerson)
    {
      if (window.confirm(`${newName} already added to the phonebook, would you like to replace the old number?`)) {
        const changedPerson= {...existingPerson, number: newNumber}

        personService.update(existingPerson.id, changedPerson).then(
          returnedPerson => {
            setPersons(persons.map(
              person => person.id != existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            setNotification({
              type: 'success',
              text: `Updated ${newName}`
            })
            setTimeout(() => setNotification(null), 5000)
          })
          .catch(()=> {
            setNotification({
              type: 'error',
              text: `Information of '${existingPerson.name}' has already been removed from server`
            })
            setTimeout(() =>setNotification(null), 5000)
            setPersons(persons.filter(person=> person.id!==existingPerson.id))
          })
      }
    }
    else {
      const newObject = {
        name: newName, 
        number: newNumber
      }

      personService.create(newObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification ({
          type: "success",
          text: `Added ${newName}`
      })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotification({
          type: 'error',
          text: error.response.data.error
        })
        setTimeout(() => setNotification(null), 5000)
      })
    }

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notification}/>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={handleDelete} />
    </div>
  )
}

export default App