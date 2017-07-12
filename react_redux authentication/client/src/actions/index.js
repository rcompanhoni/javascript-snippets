import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
    // /this function (and the dispatch method) is available here via 'redux-thunk'
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                // update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });

                // save the jwt token
                localStorage.setItem('token', response.data.token);

                // redirect to the route '/feature'
                browserHistory.push('/feature');
            })  
            .catch(() => {
                // show error to the user
                dispatch(authError('Bad Login Info'));
            })
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}