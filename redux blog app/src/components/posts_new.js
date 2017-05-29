import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
    renderField(field) {
        const { meta: {touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>

                <input 
                    className="form-control"
                    type="text"
                    {...field.input} // binds the redux-form Field component with the HTML event handlers (e.g onChange, onFocus, onBlur, etc)
                />

                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                 <Field 
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                 <Field 
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    };
}

// called when the form is submitted
function validate(values) {
    const errors = {};

    if (!values.title || values.title.length < 3) {
        errors.title = "Enter a title that is at least 3 characters";
    }

    if (!values.categories) {
        errors.categories = "Enter some categories";
    }

    if (!values.content) {
        errors.content = "Enter some content, please";
    }

    return errors; // if this is empty then the form is fine to submit
}

export default reduxForm({ 
    validate,
    form: 'PostNewForm'    
 })(PostsNew);