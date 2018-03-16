/* eslint-disable */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { Dropdown, MenuItem, Checkbox, ButtonToolbar, Button, FormControl } from 'react-bootstrap/lib/';
import CustomMenu from './CustomMenu';
import CustomToggle from './CustomToggle';
import styles from './styles.scss';

class FilterInput extends Component {
  constructor(props) {
    super(props);

    this.textSearch = this.textSearch.bind(this);
    this.handleOptionChecked = this.handleOptionChecked.bind(this);
    this.apply = this.apply.bind(this);

    this.state = {
      selectAll: true,
      filterText: '',
      filterOptions: [],
    };
  }

  // populate filterOptions state with filter options prop
  componentWillMount() {
    const filterOptions = this.props.filterOptions.map(option => {
      return {...option, selected: true }
    });
    this.setState({ filterOptions });
  }

  // applies text filter on the filter options prop
  textSearch(e) {
    const filterText = e.target.value;
    const filteredOptions = this.props.filterOptions.filter((option) => !filterText || option.Display.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
    this.setState({
      filterText,
      filterOptions: filteredOptions
    });
  }

  // update property of the checked option
  handleOptionChecked(changedOption) {
    const filterOptions = this.state.filterOptions.map(option => {
      if (option.Id === changedOption.Id) {
        return {...option, selected: !option.selected }
      }

      return option;
    });
    this.setState({ filterOptions });
  }

  // updates selection prop with unselected options
  apply() {
    // TODO
    console.log(this.state.filterOptions);
  }

  render() {
    if (!this.state.filterOptions) {
      return null;
    }

    const checkboxes = this.state.filterOptions.map((option) => {
      return (
        <Checkbox
          key={v4()}
          defaultChecked={option.selected}
          onChange={() => this.handleOptionChecked(option)}
        >
          {option.Display}
        </Checkbox>
      );
    });

    return (
      <Dropdown id="dropdown-custom-menu">
        <CustomToggle bsRole="toggle" />

        <CustomMenu bsRole="menu">
          {this.props.textSearch &&
            <FormControl
              type="text"
              placeholder="Search..."
              onChange={e => this.textSearch(e)}
              value={this.state.filterText}
            />
          }

          <Checkbox
            key={v4()}
            defaultChecked={this.state.selectAll}
            onClick={() => this.setState({ selectAll: !this.state.selectAll })}
          >
            <strong>Select All</strong>
          </Checkbox>
          {checkboxes}

          <MenuItem divider />

          <ButtonToolbar style={{ minWidth: '90%', margin: '0px auto' }}>
            <Button
              bsStyle="success"
              onClick={() => this.setState({ selectAll: false })}
            >
              Clear
            </Button>

            <Button
              bsStyle="success"
              style={{ marginLeft: '10px' }}
              onClick={this.apply}
            >
              Apply
            </Button>
          </ButtonToolbar>
        </CustomMenu>

      </Dropdown>
    );
  }
}

FilterInput.defaultProps = {
  textSearch: true,
};

FilterInput.propTypes = {
  textSearch: PropTypes.bool,
};

export default CSSModules(FilterInput, styles);
