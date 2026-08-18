import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY;
console.log(api_key)

const baseurl = `https://api.openweathermap.org/data/2.5/weather`

const getWeather = (city) => {
    const request = axios.get(baseurl, {
        params: {
            q: city, 
            appid: api_key,
            units: 'metric'
        }
    })
    return request.then(response => response.data)
}

export default {getWeather}

