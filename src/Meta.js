import React, { Component, PropTypes } from 'react';
import { Row } from 'jsxstyle';
import Input from './Input';

const Meta = ({ meta, updateMeta }) =>
  <div>
    <Row>
      <label htmlFor="subject">Subject: </label>
      <Input type="text"/>
    </Row>
    <Row>
      <label htmlFor="subject">Preheader: </label>
      <Input rows="4"/>
    </Row>
  </div>;



export default Meta;
