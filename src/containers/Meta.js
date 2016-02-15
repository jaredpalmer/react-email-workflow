import React, { Component, PropTypes } from 'react';
import { bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Block } from 'jsxstyle';
import Input from '../components/Input';
import { meta } from '../actions/EmailActions';

const Meta = ({ metaData, meta }) =>
  <Block background="white"
         marginRight="45.5px"
         padding="1rem"
         marginBottom=".5rem"
         boxShadow="0 2px 2px 0 rgba(0,0,0,.08)">
    <Block width="100%" marginBottom=".5rem">
      <Input placeholder="Enter the subject line...(keep it short!)"
             value={metaData.subject}
             onChange={(e) => meta({ subject: e.target.value })}
             style={{
               width: '100%',
               fontWeight: 'bold',
               color: '#141823',
             }}
      />
    </Block>
    <Block marginBottom=".5rem">
      <Input rows={2}
             onChange={(e) => meta({ preheader: e.target.value })}
             placeholder="Preview text"
             value={metaData.preheader}
             style={{
               width: '100%',
               color: '#595f6c',
               fontSize: '14px',
               boxSizing: 'border-box',
             }}
      />
    </Block>
    <Block>
      <Input
        id="date"
        type="date"
        value={metaData.date}
        onChange={(e) => meta({ date: e.target.value })}
        style={{ width: '100%', margin: 0, flex: 1 }}
      />
    </Block>
  </Block>;

function mapStateToProps(state) {
  return { metaData: state.meta };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ meta }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Meta);
