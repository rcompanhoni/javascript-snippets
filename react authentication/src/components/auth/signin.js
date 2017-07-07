import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
 
class Signin extends Component {
    handleFormSubmit({ email, password }) {
        console.log(email, password)
    }
 
    render() {
        const { handleSubmit } = this.props;
 
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field name="email" id="email" type="email" className="form-control" component="input" />
                </fieldset>

                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field name="password" id="password" type="password" className="form-control" component="input" />
                </fieldset>

                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}
 
const reduxFormSettings = {
    form: 'signin'
}
 
export default reduxForm(reduxFormSettings)(Signin)