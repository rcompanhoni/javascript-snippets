import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Button, Grid, Jumbotron, Row, Col } from 'react-bootstrap/lib/';
import * as actions from '../../actions';

import LearnMore from './learn_more';

import styles from './styles.scss';

const Body = ({ createAlert }) => (
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
    </Grid>
  </div>
);

Body.defaultProps = {
  createAlert: f => f,
};

Body.propTypes = {
  createAlert: PropTypes.func,
};

const styledComponent = CSSModules(Body, styles);
export default connect(null, actions)(styledComponent);
