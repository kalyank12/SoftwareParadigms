import * as CommonConstants from '../../Constants';
import { forecastprops, Weatherprops, cityprops, forecastandcityprops } from './Weatherprops';

export const fetchForecastData = async (zipcodeNumber: number) => {
    const endpoint = `${CommonConstants.FORECASTAPI}?zip=${zipcodeNumber}&appid=${CommonConstants.WEATHERAPIKEY}`;

    let ForeCastDetails: forecastprops[] = [];
    let CityDetails: cityprops[] = [];
    let Forecast_CityDetails: forecastandcityprops[] = [];

    await fetch(endpoint).then(async (response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    }).then(async (responseJSON) => {

        CityDetails.push({
            city_name: responseJSON.city.name,
            country_name: responseJSON.city.country,
            lat: responseJSON.city.coord.lat,
            lon: responseJSON.city.coord.lon,
        })

        await responseJSON.list.map(async function (item: any) {
            let arrforecast_dt_txt = item.dt_txt.split(/-|\s|:/);
            let forecastdatenumber = parseInt(arrforecast_dt_txt[1] + arrforecast_dt_txt[2]);
            let forecastdate = arrforecast_dt_txt[1] + "-" + arrforecast_dt_txt[2] + "-" + arrforecast_dt_txt[0];
            let forecasttime = arrforecast_dt_txt[3] + "-" + arrforecast_dt_txt[4] + "-" + arrforecast_dt_txt[5];

            let entry = ForeCastDetails.filter(p => p.forecastdatenumber == forecastdatenumber);
            if (entry.length == 0) {
                ForeCastDetails.push({
                    humidity: item.main.humidity,
                    temp: item.main.temp,
                    temp_max: item.main.temp_max,
                    temp_min: item.main.temp_min,
                    feels_like: item.main.feels_like,
                    description: item.weather[0].description,
                    weather_main: item.weather[0].main,
                    forecastdatenumber: forecastdatenumber,
                    date_txt: forecastdate,
                    time_txt: forecasttime,
                })
            }
        })
    }).catch(async (error) => {
        Forecast_CityDetails = [];
    });

    Forecast_CityDetails.push({
        forecastdata: ForeCastDetails,
        citydata: CityDetails,
    });
    return Forecast_CityDetails;
}