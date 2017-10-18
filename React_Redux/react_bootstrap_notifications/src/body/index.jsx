import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { v4 } from 'uuid';
import { Button, Grid, Jumbotron, Row, Col } from 'react-bootstrap/lib/';
import { AlertList } from 'react-bs-notifier';
import LearnMore from './learn_more';
import styles from './styles.scss';

class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alerts: [],
    };
  }

  createAlert(type, headline, message) {
    const newAlert = {
      id: v4(),
      type,
      headline,
      message,
    };

    this.setState({
      alerts: [...this.state.alerts, newAlert],
    });
  }

  closeAlert(alert) {
    const { alerts } = this.state;
    const idx = alerts.indexOf(alert);

    if (idx >= 0) {
      this.setState({
        alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)],
      });
    }
  }

  render() {
    return (
      <div>
        <AlertList
          position="top-right"
          alerts={this.state.alerts}
          timeout={3000}
          dismissTitle="Begone!"
          onDismiss={(alert) => { this.closeAlert(alert); }}
        />

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
                  onClick={() => this.createAlert('info', 'INFO', 'This is an "info" message')}
                >Generate info »
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
                  onClick={() => this.createAlert('success', 'SUCCESS', 'This is a "success" message')}
                >Generate info »
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
                  onClick={() => this.createAlert('warning', 'WARNING', 'This is a "warning" message')}
                >Generate info »
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
                  onClick={() => this.createAlert('danger', 'DANGER', 'This is a "danger" message')}
                >Generate info »
                </Button>
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CSSModules(Body, styles);
