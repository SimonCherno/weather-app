import React, { useEffect } from 'react';
import { useAppContext } from '../services/AppProvider';
import CityCard from '../components/CityCard';
import withNavbar from '../components/withNavbar';

const Favorites = () => {
  const {favoritesWeather, fetchFavorites, isLoading, isError} = useAppContext();
  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line 
  }, []);
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
  return <div className='section section-center'>
    {favoritesWeather.length 
      ? <div className="favorite-cities">
        {favoritesWeather.map((city, i) => <CityCard key={i} {...city} />)}
      </div>
      : <h1>no favorite cities added</h1>
    }
    </div>;
};

export default withNavbar(Favorites);
