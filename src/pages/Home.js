import React from 'react';
import { useAppContext } from '../context/AppProvider';
import DayCard from '../components/DayCard';
import withNavbar from '../components/withNavbar';
import heart from '../assets/heart.svg';
import heartFill from '../assets/heart-fill.svg';
import search from '../assets/search.svg';
import AutoComplete from '../components/AutoComplete';

const Home = () => {
  const {
    isLoading, 
    isError, 
    currentWeather, 
    forecast, 
    currentCity, 
    addToFavorites,
    isFavorite,
    removeFromFavorites,
    showTemp,
    showIcon,
    isSuggestionLoading,
    isTextError,
    isDarkMode,
  } = useAppContext();
  if (isLoading) {
    return <div className="main-loading-wrapper">
      <div className="loading"></div>    
    </div>
  }
  if (isError.show) {
    return <div className='section-center section'>
      <h1>Ooops, something went wrong</h1>
      <p>{isError.message}</p>
    </div>
  }
  return <div>
    <div className="section-center section">
      <div className='search-bar'>
        {isTextError && <p className='text-error'>English letters only</p>}
        <img src={search} alt='search' className={`search-img ${isDarkMode ? 'search-dark-img' : 'search-light-img'}`}/>
        <div className="auto-complete-wrapper">
            <AutoComplete />
        </div>
        <div className="loading-wrapper">
          {isSuggestionLoading && <div className='loading-suggestions'></div>}
        </div>
      </div>
        <div className="header">
          <div className="city">
            <img className='city-icon' src={showIcon(currentWeather.weatherIcon)} alt="weather-icon" />
            <div className="city-info">
              <h4>{currentCity.label}</h4>
              <h4>{showTemp(currentWeather.temperature)}</h4>
            </div>
          </div>
          <div className="favorite">
            {isFavorite() 
              ? <button 
                  className="btn btn-outline-danger favorite-btn" 
                  onClick={() => removeFromFavorites(currentCity.id)}
                >
                  <img className='filter-red' src={heartFill} alt='heart-fill'></img> Remove From Favorites
                </button>
              : <button 
                  className="btn btn-outline-danger favorite-btn" 
                  onClick={addToFavorites}
                >
                  <img className='filter-red' src={heart} alt='heart'></img> add to favorites
                </button>
            }
          </div>
        </div>
        <h1 className='weather-text'>{currentWeather.weatherText}</h1>
        <div className="forecast">
          {forecast.map((day, i) => <DayCard key={i} {...day} />)}
        </div>
    </div>
  </div>;
};

export default withNavbar(Home, 'home');
