import React from 'react';
import { useAppContext } from '../services/AppProvider';
import DayCard from '../components/DayCard';
import withNavbar from '../components/withNavbar';
import AutoComplete from '../components/AutoComplete';
import { APIKeys } from '../services/utils';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

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
    changeApiKey,
    keyNum,
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
      {keyNum !== APIKeys.length - 1 && <button className='btn btn-outline-danger' onClick={changeApiKey}>Change api key ({keyNum + 1}/{APIKeys.length})</button>}
    </div>
  }
  return <div>
    <div className="section-center section">
      <div className='search-bar'>
        {isTextError && <p className='text-error'>English letters only</p>}
        <div className="auto-complete-wrapper">
            <AutoComplete />
        </div>
        <div className="loading-wrapper">
          {isSuggestionLoading && <div className='loading-suggestions'></div>}
        </div>
      </div>
        <div className="header">
              <h2>{currentCity.label}</h2>
              <div className="city-info">
                  <img className='city-icon' src={showIcon(currentWeather.weatherIcon)} alt="weather-icon" />
                  <h3>{showTemp(currentWeather.temperature)}</h3>
                <div className="favorite">
                  {isFavorite() 
                    ? <AiFillHeart  
                        className="heart-icon" 
                        onClick={() => removeFromFavorites(currentCity.id)}
                      />
                    : <AiOutlineHeart
                        className="heart-icon" 
                        onClick={addToFavorites}
                      />
                  }
                </div>
              </div>
              <div className="city-info">
                <h3>{currentWeather.weatherText}</h3>
              </div>
          
        </div>
        <div className="forecast">
          {forecast.map((day, i) => <DayCard key={i} {...day} />)}
        </div>
    </div>
  </div>;
};

export default withNavbar(Home);
