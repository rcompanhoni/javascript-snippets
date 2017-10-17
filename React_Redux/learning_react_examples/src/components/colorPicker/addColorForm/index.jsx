import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

const AddColorForm = ({ onNewColor = f => f }) => {
  let title;
  let color;

  const submit = (e) => {
    e.preventDefault();

    onNewColor(title.value, color.value);
    title.value = '';
    color.value = '#000000';
    title.focus();
  };

  return (
    <form onSubmit={submit}>
      <input
        ref={(input) => { title = input; }}
        type="text"
        placeholder="color title..."
        required
      />

      <input
        ref={(input) => { color = input; }}
        type="color"
        required
      />

      <button>ADD</button>
    </form>
  );
};

AddColorForm.defaultProps = {
  onNewColor: f => f,
};

AddColorForm.propTypes = {
  onNewColor: PropTypes.func,
};

export default CSSModules(AddColorForm, styles);
