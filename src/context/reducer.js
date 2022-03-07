import { APIKeys } from "../assets/assets";
const reducer = (state, action) => {
    if (action.type === 'SET_INPUT') {
        return {
            ...state, input:action.payload
        }
    }
    if (action.type === 'START_FETCH'){
        return {
            ...state, isLoading: true, isError:{show: false, message:''}
        }
    }
    if (action.type === 'SET_CURRENT_WEATHER') {
        const {
            WeatherText: weatherText,
            WeatherIcon: weatherIcon,
            Temperature:{Metric:{Value: temperature}}
        } = action.payload[0];
        const currentWeather = {
            weatherText,
            weatherIcon,
            temperature
        }
        return {
            ...state, isLoading:false, isError:{show: false, message:''}, currentWeather
        }
    }
    if (action.type === 'SET_FORECAST') {
        const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        const forecast = action.payload.DailyForecasts.map((day) => {
            return {
                minTemp: day.Temperature.Minimum.Value,
                maxTemp: day.Temperature.Maximum.Value,
                dayWeatherIcon: day.Day.Icon,
                nightWeatherIcon: day.Night.Icon,
                weekday: weekday[new Date(day.Date).getDay()],
                link: day.Link,
            }
        });
        return {
            ...state, isLoading:false, isError:{show: false, message:''}, forecast
        }
    }
    if (action.type === 'SET_ERROR') {
        return {
            ...state, isLoading:false, isError:{show: true, message:action.payload}, isSuggestionLoading: false
        }
    }
    if (action.type === 'SET_SUGGESTIONS') {
        const uniqueCityNames = [...new Set(action.payload.map((result) => result.LocalizedName))];
        const searchSuggestions = uniqueCityNames.map((name) => {
            const {Key:id} = action.payload.find((result) => result.LocalizedName === name)
            return {
                id,
                label: name
            }
        })
        return {
            ...state, searchSuggestions, isSuggestionLoading: false
        }
    }
    if (action.type === 'SET_CURRENT_CITY'){
        return {
            ...state, currentCity: action.payload
        }
    }
    if (action.type === 'ADD_TO_FAVORITES'){
        let favorites = [...state.favorites];
        favorites.push(state.currentCity);
        localStorage.setItem('favorites',JSON.stringify(favorites));
        return {
            ...state, favorites
        }
    }
    if (action.type === 'REMOVE_FROM_FAVORITES'){
        let favorites = state.favorites.filter((city) => city.id !== action.payload);
        let favoritesWeather = state.favoritesWeather.filter((city) => city.id !== action.payload);
        localStorage.setItem('favorites',JSON.stringify(favorites));
        return {
            ...state, favorites, favoritesWeather
        }
    }
    if (action.type === 'START_FETCH_FAVORITES'){
        return {
            ...state, favoritesWeather: [], isLoading:true, isError:{show: false, message:''}
        }
    }
    if (action.type === 'SET_FAVORITES_WEATHER') {
        const {data, city} = action.payload;
        const {
            WeatherText:weatherText,
            WeatherIcon:weatherIcon, 
            Temperature:{Metric:{Value:temperature}}
        } = data[0];
        let favoriteWeather = {
            label: city.label,
            id: city.id,
            weatherText,
            weatherIcon,
            temperature
        }
        let favoritesWeather = [...state.favoritesWeather];
        favoritesWeather.push(favoriteWeather);
        return {
            ...state, favoritesWeather
        }
    }
    if (action.type === 'FETCH_SUCCESS'){
        return{
            ...state, isLoading:false, isError:{show: false, message:''}
        }
    }
    if (action.type === 'TOGGLE_DEGREES') {
        let isCelsius;
        if (action.payload === 'C') {
            isCelsius = true;
        }
        if (action.payload === 'F') {
            isCelsius = false;
        }
        return {
            ...state, isCelsius
        }
    }
    if (action.type === 'GET_GEO_LOCATION') {
        const {latitude, longitude} = action.payload.coords;
        const location = `${latitude},${longitude}`;
        const geoLocation = {
            success: true,
            location
        }
        return {
            ...state, geoLocation
        }
    }
    if (action.type === 'SET_CITY_BY_GEO_LOCATION'){
        const {Key:id, LocalizedName:label} = action.payload;
        const currentCity = {id, label};
        return {
            ...state, isLoading:false, isError:{show: false, message:''}, currentCity, geoLocation:{success: false, location:''}
        }
    }
    if (action.type === 'LOAD_SUGGESTIONS'){
        return {
            ...state, isSuggestionLoading: true
        }
    }
    if (action.type === 'STOP_SUGGESTION_LOADING'){
        return {
            ...state, isSuggestionLoading: false
        }
    }
    if (action.type === 'SET_IS_TEXT_ERROR'){
        return {
            ...state, isTextError:action.payload
        }
    }
    if (action.type === 'TOGGLE_THEME'){
        return {
            ...state, isDarkMode: !state.isDarkMode
        }
    }
    if (action.type === 'CHANGE_API_KEY'){
        let keyNum = state.keyNum;
        let isError = {
            show: false,
            message: ''
        }
        if (keyNum === APIKeys.length - 1) {
            isError = {
                show: true,
                message: 'out of keys'
            }
        } else {
            keyNum = state.keyNum + 1;
        }
        return {
            ...state, keyNum, isError
        }
    }
};

export default reducer;
