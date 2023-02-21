import React, { useState } from 'react';
import '../App.css';

interface IPropsSearch{
  onSearchClicked: (token:string, cityName:string)=>void
}

function SearchFormCpt(props:IPropsSearch) {
  const [api, setApi] = useState<string>('')
  const [cityKey, setCityKey] = useState<string>('')

  const setAPIState = (event:React.ChangeEvent<HTMLInputElement>) => {
    setApi(event.target.value)
  }

  const setCityState = (event:React.ChangeEvent<HTMLInputElement>) => {
    setCityKey(event.target.value)
  }

  const searchCity = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    props.onSearchClicked(api, cityKey)
  }

  return (
    <div className='search-bar'>
        <form className='form-search'>
        <div className='inline-input'>
            <label>API token</label>
            <input type="text" placeholder='insert token' onChange={apiInput => setAPIState(apiInput)}/>
        </div>
        <div className='inline-input'>
            <label>City</label>
            <input type='text' placeholder='insert city name' onChange={cityInput => setCityState(cityInput)}/>
        </div>
        <div className='inline-input'>
            <button onClick={searchCity}>Search</button> 
        </div>
        </form>
    </div>
  );
}

export default SearchFormCpt;
