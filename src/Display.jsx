import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import Typography from '@mui/material/Typography';

export default function Display({weatherInfo}){
    // let[imagew , setImage] = useState("https://images.unsplash.com/photo-1495756111155-45cb19b8aeee?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
    const COLD_URL = "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const HOT_URL = "https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const RAIN_URL = "https://media.istockphoto.com/id/1407844890/photo/transparent-umbrella-under-heavy-rain-against-water-drops-splash-background-rainy-weather.jpg?s=2048x2048&w=is&k=20&c=Y7pLwc3vDnej12YAuOU1ZDfMLouY-7xeNtJNceu_PMI=";
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image = {weatherInfo.humidity > 80 ? RAIN_URL : weatherInfo.temp > 15 ? HOT_URL : COLD_URL}
          title="Weather"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"  >
            {weatherInfo.city} &nbsp;{weatherInfo.humidity > 80 ? <ThunderstormIcon/> : weatherInfo.temp > 15 ? <WbSunnyIcon/> : <AcUnitIcon/>}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
           <p>Temperature = {weatherInfo.temp}&deg;C</p>
           <p>Humidity = {weatherInfo.humidity}</p>
           <p>Max_Temparature = {weatherInfo.tempMax}&deg;C</p>
           <p>Min_Temparature = {weatherInfo.tempMin}&deg;C</p>
           <p>The Temparature can be described as <i>{weatherInfo.weatherCond}</i> and feels like  <i>{weatherInfo.feelsLike}&deg;C</i> </p>
           <p></p>
          </Typography>
        </CardContent>
      </Card>
    )
}