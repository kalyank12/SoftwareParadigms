export type Weatherprops = {
    city_name: string;
    humidity: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    description: string;
    weather_main: string;
}

export type forecastprops = {
    humidity: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    description: string;
    weather_main: string;
    forecastdatenumber: number;
    date_txt: string;
    time_txt: string;
}

export type forecastdataprops = {
    forecastdata: forecastprops[];
}

export type forecastandcityprops = {
    forecastdata: forecastprops[];
    citydata: cityprops[];
}

export type cityprops = {
    city_name: string;
    country_name: string;
    lat: string;
    lon: string;
}