/* eslint-disable */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { Dropdown, MenuItem, Checkbox, ButtonToolbar, Button } from 'react-bootstrap/lib/';
import CustomMenu from './CustomMenu';
import CustomToggle from './CustomToggle';
import styles from './styles.scss';

class FilterInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectAll: true,
    };
  }

  render() {
    const { filterOptions } = this.props;
    if (!filterOptions) {
      return null;
    }

    const checkboxes = filterOptions.map(option => <Checkbox key={v4()} defaultChecked={this.state.selectAll}>{option.Display}</Checkbox>);

    return (
      <Dropdown id="dropdown-custom-menu">
        <CustomToggle bsRole="toggle" />

        <CustomMenu bsRole="menu">
          <Checkbox
            key={v4()}
            defaultChecked={this.state.selectAll}
            onClick={() => this.setState({ selectAll: !this.state.selectAll })}
          >Select All
          </Checkbox>
          {checkboxes}

          <MenuItem divider />

          <ButtonToolbar>
            <Button bsStyle="success" onClick={() => this.setState({ selectAll: false })}>Clear</Button>
            <Button bsStyle="success">Apply</Button>
          </ButtonToolbar>
        </CustomMenu>

      </Dropdown>
    );
  }
}

export default CSSModules(FilterInput, styles);
