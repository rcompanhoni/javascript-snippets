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
        TABLE_CONTAINER: 'table-responsive',
        HEADER_FIXED_CONTAINER: 'header-fixed',
        HEADER: 'header-bs',
        HEADER_HIDDEN: 'hidden-override',
        ROW: 'row-bs',
        CELL: 'text-left',
        COLUMN: 'column-bs',
        PAGERTOOLBAR: 'text-right bootstrap-description',
        BUTTONS: {
          PAGER: 'btn pull-left negative-margin',
        },
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
