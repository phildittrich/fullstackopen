import Country from './Country'

const Countries = ({search, countries}) => {
  const filteredCountries = countries.filter( country => 
      country.name.common.toLowerCase().includes(search.toLowerCase()) 
    )
  
  const listCountries = () => {
    if( filteredCountries.length > 10 ) {
      return <p>Too many matches, specify another filter</p>
    }
    else if( filteredCountries.length > 1 ) {
      return (
        <ul>
          { filteredCountries.map( (country) => 
            <li key={country.name.common}>
              {country.name.common}
            </li>
          )}
        </ul>
      )
    }
    else if( filteredCountries.length === 1 ) {
      return <Country country={filteredCountries[0]} />
    }
    else {
      return <p>No country found</p>
    }
  }

  return (
    <div>
      {listCountries()}
    </div>
  )
}


export default Countries