const Weather = ({weather}) =>
  <>
    <p>temp {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
    <p>wind {weather.wind.speed} m/s</p>
  </>

export default Weather