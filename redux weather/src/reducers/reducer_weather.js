import { FETCH_WEATHER } from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_WEATHER: 
            return [action.payload.data, ...state]; // concats the new city data to the previous array of cities -- [city.city,city]
    }
    
    return state;
}