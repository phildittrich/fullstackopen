import { useEffect, useState } from 'react'
import axios from 'axios';

import Search from './components/Search'
import Countries from './components/Countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearchChange = event => setSearch(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then( response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <>
      <Search value={search} handleChange={handleSearchChange} />
      <Countries search={search} countries={countries} />
    </>
  )
}

export default App;
