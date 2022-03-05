import React from 'react';
import { useAppContext } from '../context/AppProvider';

const DayCard = ({
  weekday, 
  minTemp, 
  maxTemp, 
  dayWeatherIcon, 
  nightWeatherIcon, 
  link
}) => {
  const {showTemp, showIcon} = useAppContext();
  return <a className='day-card-link' href={link}>
    <h5 className='weekday'>{weekday}</h5>
    <div className="daycard-content">
     <div className="day">
       <img src={showIcon(dayWeatherIcon)} alt="Icon" />
       <p className='degrees'>{showTemp(maxTemp)}</p>
     </div>
     <div className="night">
       <img src={showIcon(nightWeatherIcon)} alt="Icon" />
       <p className='degrees'>{showTemp(minTemp)}</p>
     </div>
    </div>
  </a>;
};

export default DayCard;
