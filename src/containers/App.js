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
        <Row height="50px"
             position="fixed"
             top="0"
             left="0"
             width="100%"
             alignItems="center"
             justifyContent="flex-start"
             background="#212121"
             borderBottom="1px solid #111">
          <h2 style={{
                marginLeft: '1rem',
                lineHeight: 1,
                fontWeight: '300',
                color: '#ffffff',
              }}>
            React Email Workflow
          </h2>
        </Row>
        <Block maxWidth="616px"
               background="#f2f2f2"
               borderRight="1px solid #c4c4c4"
               marginTop="50px"
               height="calc(100vh - 50px)"
               padding="1rem 1rem 0">
            <Meta/>
            <ElementList/>
        </Block>
        <Preview/>
      </Col>
    );
  }
}
