import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(() => {
                dispatch(authError('Bad Login Info'));
            })
    }
}

export function signupUser({ email, password }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(error => dispatch(authError(error.response.data.error)))
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER }
}

// redux thunk version
export function fetchMessage() {
    return function (dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                debugger
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            })
            .catch(error => console.log(error));
    }
}

// same thing as before but using redux-promise
// export function fetchMessage() {
//     return function (dispatch) {
//         const request = axios.get(ROOT_URL, {
//             headers: { authorization: localStorage.getItem('token') }
//         })

//         return {
//             type: FETCH_MESSAGE,
//             payload: response.data.message
//         }
//     }
// }