import styles from '../App/styles.module.css'
export const WeatherDay=({min,max,weatherType,weatherKey,dayOfWeek})=>{
    return(
        
       <>
            
            {dayOfWeek}
            <div style={{fontWeight:"600",}}>
            {weatherType}
            
            </div>
            <img src={`https://developer.accuweather.com/sites/default/files/${weatherKey}-s.png`} alt={weatherType} height="80px" width="140px"/>    
           <br/>
            <div className={styles.footer}>Min {min} F - Max {max} F</div>
            
        </>
    )
}