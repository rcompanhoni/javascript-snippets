import React from 'react';
import CSSModules from 'react-css-modules';
import { Grid } from 'react-bootstrap/lib';
import styles from './styles.scss';

const Footer = () => (
  <Grid>
    <hr />
    <footer>
      <p>© Company 2017</p>
    </footer>
  </Grid>
);

export default CSSModules(Footer, styles);
