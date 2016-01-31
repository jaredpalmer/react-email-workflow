import React, { Component } from 'react';
import {Block, Row} from 'jsxstyle';
import Button from './Button';
import Input from './Input';
import Meta from './Meta';
import Container from './Container';
import L from './LayoutConstants';
import Preview from './Preview';

export class App extends Component {
  render() {
    return (
      <Row style={{margin: "1rem"}}>
        <Preview />
        <div style={{marginLeft: "1rem"}}>
          <h1 fontFamily={L.sans}>Redux Email Helper</h1>
          <Meta/>
          <Container/>
        </div>
      </Row>
    );
  }
}
