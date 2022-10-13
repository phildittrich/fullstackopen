import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''  
  })
  const [searchTerm, setSearchTerm] = useState('')

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
      setPersons(persons.concat(newPerson))
      setNewPerson({
        name: '',
        number: ''
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