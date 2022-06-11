import { useEffect, useState } from 'react';
import { WeatherDay } from '../WeatherDay/WeatherDay';
import styles from './styles.module.css'
import { apikey } from '../constants';
import { LocationSearch } from '../LocationSearch/LocationSearch';



export const App = () => {

  // const locationKey='260625_PC';

  const [locationKey,setLocationKey]= useState('');
  

  const [weatherInfo,setWeatherInfo]=useState('');


  const [location,setLocation]=useState('');

  

  const padNum = (num) => {
    const stringNum = num + '';
    const stringLen = stringNum.length;

    if(stringLen === 1) {
      return '0' + stringNum // 4 to 04
    }
    else{
      return stringNum; // 04 to 04
    }
  }

  useEffect(() => {

    const dayOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    if(locationKey){
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}_PC?apikey=${apikey}`)
    .then(res=> res.json())
    .then(res=> {
      setWeatherInfo(res.DailyForecasts.map(df => {
      return{
        min:df.Temperature.Minimum.Value,
        max:df.Temperature.Maximum.Value,
        weatherType:df.Day.IconPhrase,
        weatherKey:padNum(df.Day.Icon),
        dayOfWeek: dayOfWeek[new Date(df.Date).getDay()],
      }
    }));
  })
}
    

    },[locationKey]);


  return (
  <div>

    <LocationSearch onCityFound={cityInfo=>{
      setLocationKey(cityInfo.key);
      setLocation(cityInfo.name + ' - ' + cityInfo.state)}} />

     <h1 className={styles.header}>{location}</h1>

     <div className={styles.main}>
     
     {!!weatherInfo && weatherInfo.map((i, index)=>(
       <div className={styles.day} key={index}>
         <WeatherDay 
         min={i.min} 
         max={i.max} 
         weatherType={i.weatherType} 
         weatherKey={i.weatherKey}
         dayOfWeek={i.dayOfWeek}/>
         </div>
     ))}
      </div>
  </div>
  )
  };
