const baseUrl = 'http://api.openweathermap.org'

const getCities = (apiKey:string, cityName:string) => {
    return fetch(`${baseUrl}/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => (data));
}

const getWeatherByCoordinates = (apiKey:string, lat:number, lon:number) => {
    return fetch(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric `)
        .then(response => response.json())
        .then(data => (data));
}

export {getCities, getWeatherByCoordinates}