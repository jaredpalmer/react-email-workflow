import React, { Component, PropTypes } from 'react';
import { bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Row } from 'jsxstyle';
import Editable from './components/Editable';
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
      <label htmlFor="subject">Subject</label>
      <Input
        tagName="div"
        placeholder="Subject"
        value={metaData.subject}
        onChange={(e) => meta({subject: e.target.value})}
        style={{flex: 1, marginBottom: ".25rem"}}
      />
    </Row>
    <Row alignItems="center">
      <Editable
        style={{
          flex: 1,
          color: '#595f6c',
          fontSize: '16px',
          lineHeight: '24px',
          outline: 'none !important',
          border: 'none !important',
          borderRadius:'2px',
          cursor: 'auto',
          WebkitAppearance: 'none',
        }}
        onChange={(e) => meta({preheader: e.target.value})}
        tagName="div"
        placeholder="Preview text"
        html={metaData.preheader}
      />
    </Row>
    <Row alignItems="center">
      <Input
        id="date"
        type="date"
        value={metaData.date}
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
