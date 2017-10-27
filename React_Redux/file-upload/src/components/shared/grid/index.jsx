/* eslint-disable */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Grid, applyGridConfig } from 'react-redux-grid';
import styles from './styles.scss';

const data = [
  {
    category: 'Teste 01',
    categoryCode: 1,
    editable: true,
  },
  {
    category: 'Teste 02',
    categoryCode: 2,
    editable: true,
  },
  {
    category: 'Teste 03',
    categoryCode: 3,
    editable: true,
  },
];

const config = {
  stateKey: 'grid',
  plugins: {},
  columns: [
    {
      dataIndex: 'category',
      name: 'Category',
    },
    {
      dataIndex: 'categoryCode',
      name: 'Category Code',
    },
    {
      dataIndex: 'editable',
      name: 'Editable',
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

    return <Grid data={data} {...config} />;
  }
}

const styledComponent = CSSModules(ReactGrid, styles);
export default styledComponent;
