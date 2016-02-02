import React, { Component } from 'react';
import {Block, Row, Col} from 'jsxstyle';
// import Button from './Button';
// import Input from './Input';
import Meta from './Meta';
import ElementList from './ElementList';
import L from '../LayoutConstants';

export default class App extends Component {
  render() {
    return (
      <Col>
        <Row
          height="50px"
          alignItems="center"
          justifyContent="center"
          marginBottom="1rem"
          borderBottom="1px solid #eee">
          <h2 style={{textAlign: 'center', lineHeight: 1, marginBottom: 0 }}>React Email Workflow</h2>
        </Row>
        <Row
          margin="1rem"
          alignItems="center"
          justifyContent="space-around">
          <Block>
            <Meta/>
            <ElementList/>
          </Block>
        </Row>
      </Col>
    );
  }
}
