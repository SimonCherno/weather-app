export const APIKeys = [
  'S3yt53eqNHH8U1gDCrHccl2SxW7RaBsx',
  '8pDGSFuDVpHnYQsqqPCdp9M33iTQVOZA', 
  'nFyG2dxmGA7iRDUMlSWlpSLged6VVh4V',
  'FtJ5cNeuBH16t8ZoS57bI2JhKzRwRoxH',
  'pGRAM5ufgbzxjXRrI7IPlHelEKxBUZEc',
  'SsfxMOvwzTppvfMpu4GtCk8ENs3pSAgm',
];
export const searchAutoCompleteUrl = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=";
export const currentWeatherUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
export const forecastUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
export const geoLocationUrl = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=";

export const defaultCity = {
  id: '215854',
  label: 'Tel Aviv'
}

export const setBackground = (iconNum) => {
  if ((iconNum >= 1 && iconNum <= 5) || iconNum === 30) {
    return 'sun'
  }
  if ((iconNum >= 6 && iconNum <= 11) || iconNum === 32 || (iconNum >= 37 && iconNum <= 38)) {
    return 'cloud'
  }
  if ((iconNum >= 12 && iconNum <= 18) || iconNum === 31 || (iconNum >= 39 && iconNum <= 44)) {
    return 'rain'
  }
  if (iconNum >= 19 && iconNum <= 29) {
    return 'snow'
  }
  if (iconNum >= 33 && iconNum <= 36) {
    return 'moon'
  }
}