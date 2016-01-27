import React, { Component } from 'react';
import {Block, Row} from 'jsxstyle';
import Button from './Button';
import Input from './Input';

import Container from './Container';
import L from './LayoutConstants';

export class App extends Component {
  render() {
    return (
      <Row style={{margin: "1rem"}}>
        <div>
          <h1 fontFamily={L.sans}>Redux Email Helper</h1>
          <Row>
            <label htmlFor="subject">Subject: </label>
            <Input type="text"/>
          </Row>
          <Row>
            <label htmlFor="subject">Preheader: </label>
            <Input rows="4"/>
          </Row>
          <Container/>
        </div>
      </Row>
    );
  }
}
