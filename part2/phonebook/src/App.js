import { useEffect, useState } from 'react'

import personsService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''  
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 5000)
  }

  const handleNameChange = (event) => {
    setNewPerson({
      ...newPerson, 
      name:  event.target.value
    })
  }

  const handleNumberChange = (event) => {
    setNewPerson({
      ...newPerson,
      number: event.target.value
    })
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const removePerson = (id) => {
    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find( person => person.name === newPerson.name )

    if (existingPerson && window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personsService
          .update(existingPerson.id, newPerson)
          .then(data => {
            setPersons( persons.map( p => p.id !== data.id ? p : data ) )
            showNotification(`${existingPerson.name} has been updated`)
            setNewPerson({
              name: '',
              number: ''
            })
          })
    } else {
      personsService
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          showNotification(`${newPerson.name} has been added`)
          setNewPerson({
            name: '',
            number: ''
          })
        })
        .catch(error => {
          console.log('fail')
        })
    }
  }

  const personsToShow = searchTerm === '' 
    ? persons 
    : persons.filter( person => 
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Filter value={searchTerm} handleChange={handleSearchTermChange} />
      <h2>add a new</h2>
      <PersonForm value={newPerson} handleSubmit={addNewPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={removePerson} />
    </div>
    
  )
}

export default App