import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';

class Signin extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email, password });
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

const validate = null;
const mapStateToProps = null;

const SigninReduxForm = reduxForm({
    form: 'signin',
    validate
})(Signin);

export default connect(mapStateToProps, actions)(SigninReduxForm);