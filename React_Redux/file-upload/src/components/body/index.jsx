import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import axios from 'axios';
import { Button, Grid, Jumbotron, Row, Col } from 'react-bootstrap/lib/';
import * as actions from '../../actions';

import LearnMore from './learn_more';
import ReactGrid from '../shared/grid';
import Dropzone from '../shared/dropzone';
import UploadButton from '../shared/upload_button';

import styles from './styles.scss';

class Body extends Component {
  constructor(props, context) {
    super(props, context);

    this.store = context.store;

    this.onDrop = this.onDrop.bind(this);

    this.state = {
      gridData: [],
    };
  }

  componentWillMount() {
    const url = 'https://randomuser.me/api/?results=10';
    axios.get(url)
      .then((response) => {
        const data = response.data.results.map(user => (
          {
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            gender: user.gender,
          }));

        this.setState({
          gridData: data,
        });
      })
      .catch((error) => {
        this.props.createAlert({ type: 'danger', headline: 'DANGER', message: error });
      });
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (rejectedFiles.length > 0) {
      this.props.createAlert({ type: 'danger', headline: 'Error', message: 'The provided file is not valid.' });
    } else {
      this.props.createAlert({ type: 'success', headline: 'File Uploaded', message: 'A file was uploaded successfully.' });
    }
  }

  render() {
    const { createAlert } = this.props;

    return (
      <div>
        <Jumbotron>
          <Grid>
            <h1>Hello, world!</h1>
            <p>This is a template for a simple marketing or informational website. It includes a
            large callout called a jumbotron and three supporting pieces of content. Use it as
            a starting point to create something more unique.
            </p>
            <LearnMore />
          </Grid>
        </Jumbotron>

        <Grid>
          <Row>
            <Col md={3}>
              <h2>Info</h2>
              <p>Adipisicing ratione incidunt eaque expedita rerum porro inventore. Nihil sit
                ipsam iure officiis sit eos at quibusdam natus dignissimos natus dolore!
                Vel doloremque ipsa alias nihil harum laborum necessitatibus rerum?
              </p>
              <p>
                <Button
                  bsStyle="info"
                  onClick={() => createAlert({ type: 'info', headline: 'INFO', message: 'This is an "info" message' })}
                >Generate info alert »
                </Button>
              </p>
            </Col>

            <Col md={3}>
              <h2>Success</h2>
              <p>Adipisicing ratione incidunt eaque expedita rerum porro inventore. Nihil sit
                ipsam iure officiis sit eos at quibusdam natus dignissimos natus dolore!
                Vel doloremque ipsa alias nihil harum laborum necessitatibus rerum?
              </p>
              <p>
                <Button
                  bsStyle="success"
                  onClick={() => createAlert({ type: 'success', headline: 'SUCCESS', message: 'This is a "success" message' })}
                >Generate success alert »
                </Button>
              </p>
            </Col>

            <Col md={3}>
              <h2>Warning</h2>
              <p>Adipisicing ratione incidunt eaque expedita rerum porro inventore. Nihil sit
                ipsam iure officiis sit eos at quibusdam natus dignissimos natus dolore!
                Vel doloremque ipsa alias nihil harum laborum necessitatibus rerum?
              </p>
              <p>
                <Button
                  bsStyle="warning"
                  onClick={() => createAlert({ type: 'warning', headline: 'WARNING', message: 'This is a "warning" message' })}
                >Generate warning alert »
                </Button>
              </p>
            </Col>

            <Col md={3}>
              <h2>Danger</h2>
              <p>Adipisicing ratione incidunt eaque expedita rerum porro inventore. Nihil sit
                ipsam iure officiis sit eos at quibusdam natus dignissimos natus dolore!
                Vel doloremque ipsa alias nihil harum laborum necessitatibus rerum?
              </p>
              <p>
                <Button
                  bsStyle="danger"
                  onClick={() => createAlert({ type: 'danger', headline: 'DANGER', message: 'This is a "danger" message' })}
                >Generate danger alert »
                </Button>
              </p>
            </Col>
          </Row>

          <hr />

          <Row>
            <UploadButton
              text="Select files..."
              bsStyle="success"
              onDrop={this.onDrop}
              mimeTypes="image/png, image/jpeg, application/pdf"
            />

            <Dropzone
              onDrop={this.onDrop}
              mimeTypes="image/png, image/jpeg, application/pdf"
              disableClick
            >
              <ReactGrid data={this.state.gridData} store={this.store} />
            </Dropzone>
          </Row>
        </Grid>
      </div>
    );
  }
}

Body.defaultProps = {
  createAlert: f => f,
};

Body.propTypes = {
  createAlert: PropTypes.func,
};

const styledComponent = CSSModules(Body, styles);
export default connect(null, actions)(styledComponent);
