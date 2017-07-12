import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions';

// touched property is used to prevent validation on every stroke
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <fieldset className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <input className="form-control" {...input} type={type} />
        {touched && error && <span className="text-danger">{error}</span>} 
    </fieldset>
)

class SignUp extends Component {

    handleFormSubmit({ email, password }) {
        this.props.signupUser({ email, password })
    }

    renderAlert() { 
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field name="email" component={renderField} type="email" label="Email" />
                <Field name="password" component={renderField} type="password" label="Password" />
                <Field name="password_confirmation" component={renderField} type="password" label="Password Confirmation" />

                {this.renderAlert()}

                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        );
    }
}

function validate(values) {
    let errors = {}

    if(!values.email) {
        errors.email = 'Please enter an email';
    }

    if(!values.password) {
        errors.password = 'Please enter a password';
    }

    if(!values.password_confirmation) {
        errors.password_confirmation = 'Please enter a password confirmation';
    }

    if (values.password !== values.password_confirmation) {
        errors.password = 'Password and password confirmation don\'t match!'
    }

    return errors
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
};

const form = reduxForm({
    form: 'signup',
    validate
})(SignUp);

export default connect(mapStateToProps, actions)(form);