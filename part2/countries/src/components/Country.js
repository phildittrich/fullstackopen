import { useState, useEffect } from 'react'
import axios from 'axios'

import Weather from './Weather'

const Country = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY

  const [weather, setWeather] = useState()

  const listLanguages = languages =>
    Object.keys(languages)
      .map( key => 
        <li key={key}>{languages[key]}</li> 
      )

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`)
      .then( response => {
        setWeather(response.data)
      })
  }, [country, api_key])

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

    <h2>Weather in {country.capital}</h2>
    
    { typeof weather !== 'undefined' ? 
      <Weather weather={weather} /> :
      <p>waiting for weather data...</p>
    }
    
  </>
  )
}


export default Country