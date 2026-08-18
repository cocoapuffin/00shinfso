import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import CountryForm from './components/CountryForm.jsx'
import CountryList from './components/CountryList.jsx'

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
 
  useEffect(() => {
    countryService.getAll().then(countries => {
      setCountries(countries)
    })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
    setSelectedCountry(null)
  }

  const handleShow = (country) => {
    setSelectedCountry(country);
    // <CountryDetails country={country}/>
  }

  return (
    <div>
      <CountryForm newCountry={country} handleNameChange={handleNameChange} />
      <CountryList countries={countries} filter={country} handleShow={handleShow} selectedCountry={selectedCountry}/>
    </div>
  )
}

export default App