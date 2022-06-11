import { useState } from "react";
import { apikey } from '../constants';
import styles from './styles.module.css'

export const LocationSearch = ({ onCityFound }) => {
    const [city,setcity]=useState('');

    const getLocation = (city) => {
        const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${city}`
        fetch(url)
        .then(res=>res.json())
        .then(res=>res.find(l=>l.Country.ID==='PK'))
        .then(res=> {onCityFound({ 
            name: res.LocalizedName,
            key: res.Key,
            state: res.AdministrativeArea.ID,
        });
        setcity('');});

    };


    return(
        <div className={styles.main}> 
        <label className="main_label">
            <input placeholder="Enter City" value={city} onChange={e => setcity(e.target.value)} />
        </label>
            <button onClick={()=> getLocation(city)}>Search</button>
        </div>
    )
}