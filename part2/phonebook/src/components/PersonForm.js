const PersonForm = ({value, handleSubmit, handleNameChange, handleNumberChange}) =>
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={value.name} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={value.number} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

  export default PersonForm