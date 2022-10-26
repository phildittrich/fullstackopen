import { useEffect, useState } from 'react'

import personsService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''  
  })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

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

  const addNewPerson = (event) => {
    event.preventDefault()

    if (persons.find( person => person.name === newPerson.name )) {
      alert(`${newPerson.name} already exists`)
    } else {
      personsService
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
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
      <Filter value={searchTerm} handleChange={handleSearchTermChange} />
      <h2>add a new</h2>
      <PersonForm value={newPerson} handleSubmit={addNewPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
    
  )
}

export default App