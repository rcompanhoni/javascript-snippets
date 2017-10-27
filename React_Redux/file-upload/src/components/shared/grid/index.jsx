/* eslint-disable */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Grid, applyGridConfig } from 'react-redux-grid';
import styles from './styles.scss';

const config = {
  stateKey: 'grid',
  plugins: {},
  columns: [
    {
      dataIndex: 'name',
      name: 'Name',
    },
    {
      dataIndex: 'email',
      name: 'Email',
    },
    {
      dataIndex: 'gender',
      name: 'Gender',
    },
  ],
};

class ReactGrid extends Component {
  render() {
    applyGridConfig({
      CLASS_NAMES: {
        TABLE: 'table table-bordered table-striped',
        THEADER: 'hidden',
        HEADER: 'header',
        ROW: 'row-bs',
        ERROR_HANDLER: {
          CONTAINER: 'hidden',
        },
      },
      CSS_PREFIX: '',
    });

    return <Grid data={this.props.data} {...config} />;
  }
}

const styledComponent = CSSModules(ReactGrid, styles);
export default styledComponent;
