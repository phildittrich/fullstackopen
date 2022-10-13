const Person = ({person}) => 
  <li>
    {person.name} {person.number}
  </li>

const Persons = ({persons}) =>
  <ul>
  {persons.map( person => 
    <Person
      key = {person.name}
      person = {person}
    />
  )}
  </ul>

  export default Persons