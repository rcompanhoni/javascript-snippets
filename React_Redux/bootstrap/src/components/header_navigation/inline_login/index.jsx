import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class InlineLogin extends React.Component {
  constructor() {
    super();

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      sent: false,
      emailValid: 'error',
    };
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.sent) {
      this.setState({ sent: false });
    } else {
      this.setState({ sent: true });
    }
  }

  onEmailChange(e) {
    const { value } = e.target;

    if (/.+@.+\.com/.test(value)) {
      this.setState({ emailValid: 'success' });
    } else {
      this.setState({ emailValid: 'error' });
    }
  }

  render() {
    return (
      <form className={this.props.className} onSubmit={this.onSubmit} >
        <FormControl
          type="text"
          bsStyle={this.state.emailValid}
          placeholder="Email"
          onChange={this.onEmailChange}
        />{' '}
        <FormControl type="password" placeholder="Password" />{' '}
        <Button bsStyle="success" type="submit">Sign in</Button>
      </form>
    );
  }
}

InlineLogin.defaultProps = {
  className: '',
};

InlineLogin.propTypes = {
  className: PropTypes.string,
};
