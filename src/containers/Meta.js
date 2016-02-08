import React, { Component, PropTypes } from 'react';
import { bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Row } from 'jsxstyle';
import Editable from '../components/Editable';
import Input from '../components/Input';
import { meta } from '../actions/EmailActions';

const Meta = ({ metaData, meta }) =>
  <div style={{
      background: 'white',
      marginRight:'61.5px',
      padding: '1rem',
      marginBottom: '.5rem',
      boxShadow: '0 2px 2px 0 rgba(0,0,0,0),0 3px 1px -2px rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)',
    }}>
    <Row alignItems="center">
      <Input
        placeholder="Enter the subject line...(keep it short!)"
        value={metaData.subject}
        onChange={(e) => meta({ subject: e.target.value })}
        style={{
          flex: 1,
          fontWeight: 'bold',
          color: '#141823',
        }}
      />
    </Row>
    <Row alignItems="center" margin="1rem 0">
      <Input
        style={{
          flex: 1,
          color: '#595f6c',
          fontSize: '16px',
          lineHeight: '24px',
        }}
        rows={1}
        onChange={(e) => meta({ preheader: e.target.value })}
        placeholder="Preview text"
        value={metaData.preheader}
      />
    </Row>
    <Row alignItems="center">
      <Input
        id="date"
        type="date"
        value={metaData.date}
        onChange={(e) => meta({ date: e.target.value })}
        style={{ flex: 1, marginBottom: '.25rem' }}
      />
    </Row>
  </div>;

function mapStateToProps(state) {
  return { metaData: state.meta };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ meta }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Meta);
