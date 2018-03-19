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

    this.applyCheckToAll = this.applyCheckToAll.bind(this);
    this.handleOptionChecked = this.handleOptionChecked.bind(this);
    this.apply = this.apply.bind(this);

    this.state = {
      selectAll: true,
      filterText: '',
      filterOptions: [],
    };
  }

  // populates the filterOptions state with filter options prop
  componentWillMount() {
    const filterOptions = this.props.filterOptions.map(option => ({...option, selected: true }));
    this.setState({ filterOptions });
  }

  // applies the 'selectAll' parameter as the selected property of each filter option
  applyCheckToAll(selectAll) {
    const filterOptions = this.state.filterOptions.map((option) => {
      option.selected = selectAll
      return option;
    });

    this.setState({
      selectAll,
      filterOptions
    });
  }

  handleOptionChecked(changedOption) {
    const filterOptions = this.state.filterOptions.map(option => {
      if (option.Value === changedOption.Value) {
        return {...option, selected: !option.selected }
      }

      return option;
    });
    this.setState({ filterOptions });
  }

  apply() {
    const unselectedOptions = this.state.filterOptions.reduce((result, option) => {
      if(!option.selected) {
        result.push({
          Display: option.Display,
          Value: option.Value,
        });
      }

      return result;
    }, []);

    this.props.applySelection(this.props.filterName, unselectedOptions);
  }

  render() {
    const { filterOptions, filterText } = this.state;

    if (!filterOptions) {
      return null;
    }

    // create the checkbox array considering the current text filter
    const checkboxes = filterOptions.reduce((result, option) => {
      if (!filterText || option.Display.toLowerCase().startsWith(filterText.toLowerCase())) {
        result.push(
          <Checkbox
            key={v4()}
            defaultChecked={option.selected}
            onChange={() => this.handleOptionChecked(option)}
          >
            {option.Display}
          </Checkbox>)
      }
      return result;
    }, []);

    return (
      <Dropdown id="dropdown-custom-menu">
        <CustomToggle bsRole="toggle" />

        <CustomMenu bsRole="menu">
          <FormControl
            type="text"
            placeholder="Search..."
            style={!this.props.textSearch ? { visibility: 'hidden', position: 'relative', marginBottom: '-35px'} : {}}
            onChange={e => this.setState({ filterText: e.target.value })}
            value={this.state.filterText}
          />

          <Checkbox
            key={v4()}
            defaultChecked={this.state.selectAll}
            onClick={() => this.applyCheckToAll(!this.state.selectAll)}
          >
            <strong>Select All</strong>
          </Checkbox>
          {checkboxes}

          <MenuItem divider />

          <ButtonToolbar style={{ minWidth: '90%', margin: '0px auto' }}>
            <Button
              bsStyle="success"
              onClick={() => this.applyCheckToAll(false)}
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
