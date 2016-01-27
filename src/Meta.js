import React, { Component, PropTypes } from 'react';
import { bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Row } from 'jsxstyle';
import Input from './Input';
import { meta } from './actions/EmailActions';

const Meta = ({ metaData, meta }) =>
  <div>
    <Row>
      <label htmlFor="subject">Subject: </label>
      <Input
        id="subject"
        type="text"
        value={meta.subject}
        onChange={(e) => meta({subject: e.target.value})}
      />
    </Row>
    <Row>
      <label htmlFor="preheader">Preheader: </label>
      <Input
        id="preheader"
        rows="4"
        value={meta.preheader}
        onChange={(e) => meta({preheader: e.target.value})}
      />
    </Row>
    <Row>
      <label htmlFor="date">Date: </label>
      <Input
        id="date"
        type="date"
        value={meta.date}
        onChange={(e) => meta({date: e.target.value})}
      />
    </Row>
  </div>;

function mapStateToProps(state) {
  return { metaData: state.meta }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ meta }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Meta);
