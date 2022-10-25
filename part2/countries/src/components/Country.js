const Country = ({country}) => {
  const listLanguages = languages =>
    Object.keys(languages)
      .map( key => 
        <li key={key}>{languages[key]}</li> 
      )

  return (
    <>
    <h1>{country.name.common}</h1>
    <p>
      capital {country.capital}<br />
      area {country.area}
    </p>

    <p><strong>Languages:</strong></p>
    <ul>
      {listLanguages(country.languages)}
    </ul>

    <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
  </>
  )
}


export default Country