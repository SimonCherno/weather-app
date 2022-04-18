import React from 'react';
import {useAppContext} from '../services/AppProvider';
import {Link} from 'react-router-dom';

const CityCard = ({
  id, 
  label, 
  weatherText, 
  weatherIcon, 
  temperature
}) => {
  const {
    removeFromFavorites, 
    setCurrentCity, 
    favorites, 
    showTemp, 
    showIcon
  } = useAppContext();
  const handleClick = () => {
    let newCity = favorites.find((city) => city.id === id);
    setCurrentCity(newCity);
  }
  return <div className="city-card-container">
    <Link className='city-card-link' to='/' onClick={handleClick}>
      <h4 className='city-name'>{label}</h4>
      <img src={showIcon(weatherIcon)} alt="weather-icon" />
      <p>{showTemp(temperature)}</p>
      <p>{weatherText}</p>
    </Link>
    <button className="btn btn-outline-danger favorite-btn" onClick={() => removeFromFavorites(id)}>Remove From Favorites</button>
  </div>
};

export default CityCard;
