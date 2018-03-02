import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Grid } from 'react-redux-grid';
import * as actions from '../../../actions';
import styles from './styles.scss';
import Modal from '../modal';

const STATE_KEY = 'grid';

// applyGridConfig({
//   CLASS_NAMES: {
//     TABLE: 'table table-bordered table-striped',
//     THEADER: 'hidden',
//     HEADER: 'header',
//     ROW: 'row-bs',
//     ERROR_HANDLER: {
//       CONTAINER: 'hidden',
//     },
//     GRID_ACTIONS: {
//       CONTAINER: 'action-container',
//       SELECTED_CLASS: 'action-menu-selected',
//       NO_ACTIONS: 'no-actions',
//       DISABLED: 'disabled',
//       ICON: 'action-icon',
//       MENU: {
//         CONTAINER: styles.hover,
//         ITEM: 'action-menu-item',
//       },
//     },
//   },
//   CSS_PREFIX: '',
// });

class ReactGrid extends Component {
  constructor(props) {
    super(props);

    this.config = {
      stateKey: STATE_KEY,
      plugins: {
        ROW: {
          enabled: true,
          renderer: ({ rowProps, cells, row }) => {
            const isFirstRow = row.get('_key') === 'row-0';
            if (isFirstRow) {
              return (
                <tr {...rowProps} style={{ color: 'red' }}>
                  {cells}
                </tr>
              );
            }

            return (
              <tr {...rowProps}>
                {cells}
              </tr>
            );
          },
        },
        GRID_ACTIONS: {
          menu: [
            {
              text: 'Open File Upload',
              EVENT_HANDLER: () => {
                this.setState({
                  displayUploadModal: true,
                });
              },
            },
          ],
        },
      },
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

    this.state = {
      displayUploadModal: false,
    };
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Modal display={this.state.displayUploadModal} />
        <Grid data={data} {...this.config} />
      </div>
    );
  }
}

ReactGrid.defaultProps = {
  data: null,
  createAlert: null,
};

ReactGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
  })),
  createAlert: PropTypes.func,
};

const styledComponent = CSSModules(ReactGrid, styles);
export default connect(null, actions)(styledComponent);
