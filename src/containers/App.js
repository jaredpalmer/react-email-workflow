import React, { Component } from 'react';
import {Block, Row, Col} from 'jsxstyle';
import Preview from './Preview';
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

          borderBottom="1px solid #eee">
          <h2 style={{textAlign: 'center', lineHeight: 1, marginBottom: 0 }}>React Email Workflow</h2>
        </Row>
        <Block maxWidth="600px" margin="1rem">
          <Meta/>
          <ElementList/>
        </Block>
        <Preview/>
      </Col>
    );
  }
}
