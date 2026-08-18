import { useState, useEffect } from 'react'
import weatherService from '../services/weatherService'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const capital = country.capital?.[0]
    if (capital) {
      weatherService.getWeather(capital).then(data => {
        setWeather(data)
      })
    }
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital?.join(',')}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages || {}).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

      {weather &&(
        <div>
          <h2>Weather in {country.capital?.[0]}</h2>
          <p>temperature {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default CountryDetails