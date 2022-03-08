import React, { useContext, useEffect, useReducer, createContext } from 'react';
import { currentWeatherUrl, forecastUrl, searchAutoCompleteUrl, APIKeys, defaultCity, geoLocationUrl } from '../assets/assets';
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
  keyNum: 0,
}

export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // fetch data---------------------start----------------------
  const fetchData = async () => {
    dispatch({type:'START_FETCH'});
    if (state.geoLocation.success) {
      try {
        const response = await fetch (`${geoLocationUrl}${APIKeys[state.keyNum]}&q=${state.geoLocation.location}`);
        dispatchIfOk(response, 'SET_CITY_BY_GEO_LOCATION');
      } catch (error) {
        dispatch({type:'SET_ERROR', payload:error.message});
      }
      return;
    }
    await Promise.allSettled ([
      fetch(`${currentWeatherUrl}${state.currentCity.id}?apikey=${APIKeys[state.keyNum]}`),
      fetch(`${forecastUrl}${state.currentCity.id}?apikey=${APIKeys[state.keyNum]}&metric=true`)
    ])
    .then (async(results) => {
      const [currentWeather, forecast] = results;
      if (currentWeather.status === 'fulfilled'){
        dispatchIfOk(currentWeather.value, 'SET_CURRENT_WEATHER');
      } else {
        Promise.reject(currentWeather.statusText)
      }
      if (forecast.status === 'fulfilled'){
        dispatchIfOk(forecast.value, 'SET_FORECAST');
      } else {
        Promise.reject(forecast.statusText)
      }
    })
    .catch((error) => {
      dispatch({type:'SET_ERROR', payload:error.message});
    })
  }
  const fetchSuggestions = async (controller) => {
    if (state.input){
      dispatch({type:'LOAD_SUGGESTIONS'});
      try {
        const response = await fetch(`${searchAutoCompleteUrl}${APIKeys[state.keyNum]}&q=${state.input}`, {signal: controller.signal});
        dispatchIfOk(response, 'SET_SUGGESTIONS');
      } catch (error) {
        if (error.name !== 'AbortError'){
          dispatch({type:'SET_ERROR', payload:error.message});
        }
      }
    } else {
      dispatch ({type:'STOP_SUGGESTION_LOADING'});
    }
  }
  const fetchFavorites = () => {
    dispatch({type:'START_FETCH_FAVORITES'});
    state.favorites.forEach(city => {
      let url = `${currentWeatherUrl}${city.id}?apikey=${APIKeys[state.keyNum]}`;
      fetchFavorite(url, city);
    });
    dispatch({type:'FETCH_SUCCESS'});
  }
  const fetchFavorite = async (url, city) => {
    try {
      const response = await fetch(url);
      dispatchIfOk(response, 'SET_FAVORITES_WEATHER', city);
    } catch (error) {
      dispatch({type:'SET_ERROR', payload:error.message});
    }
  }
  const dispatchIfOk = async (response, type, city=null) => {
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      if (city){
        data.push(city);
      }
      dispatch({type, payload:data});
    } else {
      Promise.reject(response.statusText)
    }
  }
  // fetch data---------------------end----------------------
  const setInput = (input) => {
    dispatch({type:'SET_INPUT', payload:input});
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
  const changeApiKey = () => {
    dispatch({type:'CHANGE_API_KEY'});
  }
    // useEffects---------------------start----------------------

    useEffect(() => {
      fetchData();
      // eslint-disable-next-line
    }, [state.currentCity, state.keyNum, state.geoLocation.success]);
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
    useEffect(() => {
      getLocation();
    }, []);
  // useEffects---------------------end----------------------
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
    changeApiKey,
  }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
}