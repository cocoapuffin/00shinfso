const CountryForm = ({ newCountry, handleNameChange }) => {
    return (
        <form>
            <div>
                find countries <input value={newCountry} onChange={handleNameChange} />
            </div>
        </form>
    )
}

export default CountryForm