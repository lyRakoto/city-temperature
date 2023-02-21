import { useState } from 'react';
import './App.css';
import SearchFormCpt from './components/searchFormCpt';
import CityCpt from './components/cityCpt';
import { getCities, getWeatherByCoordinates } from './services';
import ICity from './interfaces/ICity';
import ISelectedCity from './interfaces/ISelectedCity';
import IWeather from './interfaces/IWeather';

function App() {
  const [cities, setCities] = useState<ICity[]>([])
  const [apiKey, setApiKey] = useState<string>('')
  const [weather, setWeather] = useState<IWeather>()
  const [selectedCity, setSelectedCity] = useState<ISelectedCity>()
  
  {/**
    @param token : api key
    @param cityName : city name to search
    Get api token and city name from the inputs
    Clear the selected city
    Get and store the city list retrieved from openweathermap API into the state cities
  **/}
  const searchCities = (token:string, cityName:string):void => {
    if(token != '' && cityName != ''){
      setApiKey(token)
      setSelectedCity({})
      setCities([])
      getCities(token, cityName).then((res:ICity[]) => setCities(res))
    }
  }

  {/**
    @param lat : selected city latitude
    @param lon : selected city longitude
    @param country : country name of selected city
    @param state : state name of selected city
    Get coordinates of the selected city
    Store country name and state name of the selected city into state selectedCity
    Get the weather data of the selected city 
  */}
  const selectCity = (lat:number, lon:number, country:string, state:string) => {
    setSelectedCity({
      country:country,
      state:state
    })
    getWeatherByCoordinates(apiKey, lat, lon).then(res => setWeather(res))
  }

  return (
    <div className="App">
      <h1 className='main-title'>City temperature</h1>
      <div className='main-content'>
        <div id='search-content'>
          <SearchFormCpt onSearchClicked={searchCities}/>
          <div>
            {
              cities.length > 0 && cities.map((city:ICity, index:number) => {
                return(
                  <CityCpt cityItem={city} onSelected={selectCity} key={index}/>
                )
              })
            }
          </div>
        </div>
        {
          weather && selectedCity && Object.keys(weather).length > 0 && Object.keys(selectedCity).length > 0 && 
          <div id='result-content'>
            <h1>{weather.name}</h1>
            <h3>{selectedCity.country}, {selectedCity.state}</h3>
            <p className='temp'>{Math.round(weather.main.temp)}°C</p>
          </div> 
        }
      </div>
    </div>
  );
}

export default App;
