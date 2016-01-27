import React, { Component } from 'react';
import {Block, Row} from 'jsxstyle';
import Button from './Button';
import Input from './Input';

import Container from './Container';
import L from './LayoutConstants';

export class App extends Component {
  render() {
    return (
      <div style={{margin: "1rem"}}>
          <h1 fontFamily={L.sans}>Redux Email Helper</h1>
          <Container/>
      </div>
    );
  }
}
