import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const { meta: {touched, error } } = field; // ES6, same as 'touched = field.meta.touched' and 'error = field.meta.error'
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
                    {touched ? error : ''}  {/* display the error (if any) -- equivalent to field.meta.touched ? field.meta.error : '' */}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/'); // redirects to main post list
        });
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
                <Link to="/" className="btn btn-danger">Cancel</Link>
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
 })(
    connect(null, { createPost })(PostsNew)
 );