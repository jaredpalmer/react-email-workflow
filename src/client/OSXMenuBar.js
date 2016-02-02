import React, { PropTypes } from 'react';
import {Row, Block} from 'jsxstyle';
import OSXButton from './OSXButton';
import Button from './Button';

const OSXMenuBar = () =>
    <Row style={{
        position: 'relative',
        height: '42px',
        padding: '0 1rem',
        backgroundColor: 'white',
        borderBottom: '1px solid #ddd',
        lineHeight: '42px',
        borderTopRightRadius: '6px',
        borderTopLeftRadius: '6px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
      <Block flex='1'>
        <OSXButton/>
        <OSXButton/>
        <OSXButton/>
      </Block>
      <Block textAlign='center'>Preview</Block>
    </Row>;

export default OSXMenuBar;
