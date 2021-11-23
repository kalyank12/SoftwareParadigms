import { Weatherprops } from './Weatherprops';

const WeatherPopulateData: React.FC<Weatherprops> = ({ city_name, humidity, temp, temp_max, temp_min, feels_like, description, weather_main }) => (
    <div>
        <div>
            <p>City: {city_name}</p>
            <p>Weather Type: {weather_main}</p>
            <p>Humidity: {humidity}</p>
            <p>Temprature: {temp}</p>
            <p>Temprature Max: {temp_max}</p>
            <p>Temprature Min: {temp_min}</p>
            <p>Temprature Feels Like: {feels_like}</p>
            <p>Temprature Description: {description}</p>
        </div>
    </div>
);

export default WeatherPopulateData;