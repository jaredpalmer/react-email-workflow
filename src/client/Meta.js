import React, { Component, PropTypes } from 'react';
import { bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Row } from 'jsxstyle';
import Input from './Input';
import { meta } from './actions/EmailActions';

const Meta = ({ metaData, meta }) =>
  <div style={{
      background: 'white',
      marginRight:'61.5px',
      borderRadius: '2px',
      padding: '1rem',
      marginBottom: '.5rem'
    }}>
    <Row alignItems="center">
      <Input
        id="subject"
        type="text"
        placeholder="Subject"
        value={meta.subject}
        onChange={(e) => meta({subject: e.target.value})}
        style={{flex: 1, marginBottom: ".25rem"}}
      />
    </Row>
    <Row alignItems="center">
      <Input
        id="preheader"
        rows="4"
        placeholder="Preheader text"
        value={meta.preheader}
        onChange={(e) => meta({preheader: e.target.value})}
        style={{flex: 1, marginBottom: ".25rem"}}
      />
    </Row>
    <Row alignItems="center">
      <Input
        id="date"
        type="date"
        value={meta.date}
        onChange={(e) => meta({date: e.target.value})}
        style={{flex: 1, marginBottom: ".25rem"}}
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
