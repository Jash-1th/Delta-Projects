import { useState } from "react"

import SearchBox from "./SearchBox";
import Display from "./Display";
import "./Weather.css";

export default function Weather(){
   
    const [weatherInfo , setWeatherInfo] = useState({
        city:"Tirupati",
            feelsLike : 30.87,
            humidity:26,
            temp:32.4,
            tempMax:32.44,
            tempMin:32.44,
            weatherCond:"scattered clouds"
    })

    let updateInfo = (newInfo)=>{
        setWeatherInfo({...newInfo})
    }
   
    return (
        <div className="WeatherBox">
            <h2>Weather App</h2>
            <SearchBox updateInfo={updateInfo}></SearchBox>
        <Display weatherInfo={weatherInfo} ></Display>
        </div>
    )
}