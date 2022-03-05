import React, { useContext, useEffect, useReducer, createContext } from 'react';
import { currentWeatherUrl, forecastUrl, searchAutoCompleteUrl, APIKey, defaultCity, geoLocationUrl } from '../assets/assets';
import reducer from './reducer';

const AppContext = createContext();

const getLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites){
    return JSON.parse(favorites);
  } else {
    return [];
  }
}

const initialState = {
  input: '',
  isLoading: false,
  isError: {
    show: false,
    Message: ''
  },
  currentWeather: [],
  forecast: [],
  currentCity: defaultCity,
  favorites: getLocalStorage(),
  favoritesWeather: [],
  searchSuggestions: [],
  isCelsius: true,
  geoLocation: {
    success: false,
    location: ''
  },
  isSuggestionLoading: false,
  isTextError: false,
  isDarkMode: false,
}

export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setInput = (input) => {
    dispatch({type:'SET_INPUT', payload:input});
  }
  const fetchData = async (parameter) => {
    dispatch({type:'START_FETCH'});
    let url;
    if (parameter === 'SET_CURRENT_WEATHER'){
      url = `${currentWeatherUrl}${state.currentCity.id}?apikey=${APIKey}`;
    }
    if (parameter === 'SET_FORECAST') {
      url = `${forecastUrl}${state.currentCity.id}?apikey=${APIKey}&metric=true`;
    }
    if (parameter === 'SET_GEO_LOCATION') {
      url = `${geoLocationUrl}${APIKey}&q=${state.geoLocation.location}`;
    }
    try {
      const response = await fetch(url);
      if (response.status >= 200 && response.status <= 299){
        const data = await response.json();
        dispatch({type:parameter, payload:data});
      } else {
        dispatch({type:'SET_ERROR', payload:response.statusText});
      }
    } catch (error) {   
      dispatch({type:'SET_ERROR', payload:error.message});
    }
  }
  const fetchSuggestions = async (controller) => {
    if (state.input){
      dispatch({type:'LOAD_SUGGESTIONS'});
      try {
        const response = await fetch(`${searchAutoCompleteUrl}${APIKey}&q=${state.input}`, {signal: controller.signal});
        if (response.status >= 200 && response.status <= 299) {
          const data = await response.json();
          dispatch({type:'SET_SUGGESTIONS', payload:data});
        } else {
          dispatch({type:'SET_ERROR', payload:response.statusText});
        }
      } catch (error) {
        if (error.name !== 'AbortError'){
          dispatch({type:'SET_ERROR', payload:error.message});
        }
      }
    } else {
      dispatch ({type:'STOP_SUGGESTION_LOADING'});
    }
  }
  const setCurrentCity = (city) => {
    dispatch({type:'SET_CURRENT_CITY', payload:city});
  }
  const addToFavorites = () => {
    dispatch({type:'ADD_TO_FAVORITES'});
  }
  const isFavorite = () => {
    return state.favorites.some((city) => city.id === state.currentCity.id);
  }
  const removeFromFavorites = (cityName) => {
    dispatch({type:'REMOVE_FROM_FAVORITES', payload:cityName});
  }
  const fetchFavorite = async (url, city, i) => {
    const response = await fetch(url);
    let data = await response.json();
    dispatch({type:'SET_FAVORITES_WEATHER', payload:{data, city, i}});
  }
  const fetchFavorites = () => {
    try {
      dispatch({type:'START_FETCH_FAVORITES'});
        state.favorites.forEach((city,i) => {
          let url = `${currentWeatherUrl}${city.id}?apikey=${APIKey}`;
          fetchFavorite(url, city, i);
        });
        dispatch({type:'FETCH_SUCCESS'});
    } catch (error) {
      dispatch({type:'SET_ERROR', payload:error.message});    
    }
  }
  const showTemp = (temp) => {
    if(state.isCelsius && temp) {
      return `${temp.toFixed(0)}° C`;
    } else {
      return `${((temp*9/5) + 32).toFixed(0)}° F`;
    }
  }
  const toggleDegrees = (unit) => {
    dispatch({type:'TOGGLE_DEGREES', payload:unit});
  }
  const showIcon = (num) => {
    if (num) {
      if (num < 10) {
        num = `0${num}`;
      }
      return `https://developer.accuweather.com/sites/default/files/${num}-s.png`
    }
  }
  const getLocation = () => {
    const success = (location) => {
      dispatch({type:'GET_GEO_LOCATION', payload:location});
    }
    const error = (error) => {
      console.log(error);
    }
    navigator.geolocation.getCurrentPosition(success,error);
  }
  const setIsTextError = (value) => {
    dispatch({type:'SET_IS_TEXT_ERROR', payload:value});
  }
  const toggleTheme = () => {
    dispatch({type:'TOGGLE_THEME'});
  }
  useEffect(() => {
    getLocation();
    if (state.geoLocation.success){
      fetchData('SET_GEO_LOCATION');
    }
    // eslint-disable-next-line
  }, [state.geoLocation.success]);
  useEffect(() => {
    fetchData('SET_CURRENT_WEATHER');
    fetchData('SET_FORECAST');
    // eslint-disable-next-line
  }, [state.currentCity]);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchSuggestions(controller);
    }, 500);
    return(() => {
      clearTimeout(timer);
      controller.abort();
    }) 
    // eslint-disable-next-line
  }, [state.input]);
  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.className = 'dark-theme';
    } else {
      document.documentElement.className = 'light-theme';
    }
  }, [state.isDarkMode]);
  return <AppContext.Provider value={{
    ...state,
    setInput,
    setCurrentCity,
    addToFavorites,
    isFavorite,
    removeFromFavorites,
    fetchFavorites,
    showTemp,
    toggleDegrees,
    showIcon,
    setIsTextError,
    toggleTheme,
  }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
}

