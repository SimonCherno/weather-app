import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppProvider';
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
    return <>
      <h1>oops, something went wrong</h1>
      <p>{isError.message}</p>
    </>
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

export default withNavbar(Favorites, 'favorites');
