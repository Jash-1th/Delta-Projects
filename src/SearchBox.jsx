import Input from "./Input"
import SearchButton from "./SearchButton"
import { useState } from "react"
import "./SearchBox.css"

export default function SerchBox({updateInfo}){
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY="475121c43e5ae97f24646fd0945ee7ff";
    let [city , setCity] = useState("");
    let [error , setError] = useState(false);
    let getWeatherIno= async ()=>{
        try{
        let res = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let data = await res.json();
        console.log(data);
        let resObj = {
            city:city,
            feelsLike : data.main.feels_like,
            humidity:data.main.humidity,
            temp:data.main.temp,
            tempMax:data.main.temp_max,
            tempMin:data.main.temp_min,
            weatherCond:data.weather[0].description
        }
        return resObj;
    }
    catch(err){
        throw err;
    }
    }
    let handleInput = (event)=>{
        console.log(event.target.value);
        setCity(event.target.value);
    }

    let handleSubmit = async (event)=>{
        try{
        event.preventDefault();
        let resObj = await getWeatherIno();
        console.log(resObj)
        updateInfo(resObj);
        setError(false);
    }catch(err){
        setError(true);
    }
        
        setCity("");
    }
    return(
        <>
        <form onSubmit={handleSubmit }>
            <Input handleInput={handleInput}  city={city}></Input>
            <br></br><br></br>
            <SearchButton  ></SearchButton>
        </form>
        {
            error && <h5 style={{color : "red"}}>City  Does not Exist </h5>
        }
        </>
        
    )
} 