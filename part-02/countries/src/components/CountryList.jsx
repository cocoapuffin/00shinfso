import CountryDetails from "./CountryDetails"

const CountryList = ({ countries, filter, handleShow, selectedCountry }) => {

    if (filter === '') {
        return (null) 
}
    else {
        const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

        if (filteredCountries.length > 10) {
            return (
                <div>
                    Too many matches, specify another filter
                </div>
            )
        }

        if (selectedCountry) {
            return <CountryDetails country={selectedCountry} />
        }

        if (filteredCountries.length === 1) {
            return <CountryDetails country={filteredCountries[0]} />
        }

        return (
        <div>
            {filteredCountries.map(country => (
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => handleShow(country)}>show</button>
                </div>
            ))}
        </div>
    )}
}

export default CountryList 