import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
    // submit email/password to the server
    //axios.post(`${ROOT_URL}/signin`, { email, password }) // payload equivalent to { email: email, password: password }

    // on success
    //  - update state to indicate user is authenticated
    //  - redirect to the route '/feature'

    // on error
    //  - show error to the user
}