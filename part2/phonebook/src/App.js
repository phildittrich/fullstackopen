import { useState } from 'react'

const Person = ({person}) => 
  <li>
    {person.name} {person.number}
  </li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''  
  })

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newPerson.name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPerson.number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map( person => 
          <Person
            key = {person.name}
            person = {person}
          />
        )}
      </ul>
    </div>
    
  )
}

export default App