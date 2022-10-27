const Person = ({person, handleDelete}) => {
  const confirmDelete = () => ()  => {
    if(window.confirm(`Do you really want to delete ${person.name}?`)) {
      handleDelete(person.id)
    }
  }

  return (
    <li>
      {person.name} {person.number} <button onClick={confirmDelete()}>delete</button>
    </li>
  )
}


const Persons = ({persons, handleDelete}) =>
  <ul>
  {persons.map( person => 
    <Person
      key = {person.id}
      person = {person}
      handleDelete = {handleDelete}
    />
  )}
  </ul>

  export default Persons