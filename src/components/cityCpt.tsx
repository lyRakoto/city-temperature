import '../App.css';
import ICity from '../interfaces/ICity';

interface IPropsCity{
  cityItem:ICity,
  onSelected: (lat:number, lon:number, country:string, state:string)=>void
}

function CityCpt(props:IPropsCity) {
  const {name, country, state, lat, lon} = props.cityItem

  return (
    <div className='city-item' onClick={() => props.onSelected(lat, lon, country, state)}>
      <h3>{name}</h3>
      <h5>{country}, {state}</h5>
    </div>
  );
}

export default CityCpt;
