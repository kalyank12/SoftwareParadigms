import * as CommonConstants from '../../Constants';
import { Weatherprops } from './Weatherprops';

export const fetchWeatherData = async (zipcodeNumber: number) => {
    const endpoint = `${CommonConstants.WEATHERAPI}?zip=${zipcodeNumber}&appid=${CommonConstants.WEATHERAPIKEY}`;
    let FetchItemDetails: Weatherprops[] = [];

    await fetch(endpoint).then(async (response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    }).then(async (responseJSON) => {
        FetchItemDetails.push({
            city_name: responseJSON.name,
            humidity: responseJSON.main.humidity,
            temp: responseJSON.main.temp,
            temp_max: responseJSON.main.temp_max,
            temp_min: responseJSON.main.temp_min,
            feels_like: responseJSON.main.feels_like,
            description: responseJSON.weather[0].description,
            weather_main: responseJSON.weather[0].main,
        })
    }).catch(async (error) => {
        FetchItemDetails = [];
    });

    return FetchItemDetails;
}