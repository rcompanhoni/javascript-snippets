import axios from 'axios';

const API_KEY = 'b39166578622021b50fc16bf6e94b38e';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

export const FETCH_WEATHER = 'FETCH-WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city}`;
    const request = axios.get(url); // returns a promise

    console.log('Request:', request);

    return {
        type: FETCH_WEATHER,
        payload: request   // will be the resolved promise since we're using 'redux-promise'
    };
}