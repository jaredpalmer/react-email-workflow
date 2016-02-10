import React, { Component, PropTypes } from 'react';
import { bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Block } from 'jsxstyle';
import Editable from '../components/Editable';
import Input from '../components/Input';
import { meta } from '../actions/EmailActions';

const Meta = ({ metaData, meta }) =>
  <Block background="white"
         marginRight="45.5px"
         padding="1rem"
         marginBottom=".5rem"
         boxShadow="0 2px 2px 0 rgba(0,0,0,0),0 3px 1px -2px rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)">
    <Block width="100%">
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
    <Block boxSizing='border-box'>
      <Input rows={2}
             onChange={(e) => meta({ preheader: e.target.value })}
             placeholder="Preview text"
             value={metaData.preheader}
             style={{
               width: '100%',
               color: '#595f6c',
               fontSize: '16px',
               margin: 0,
               boxSizing: 'border-box',
               lineHeight: '24px',
             }}
      />
    </Block>
    <Block>
      <Input
        id="date"
        type="date"
        value={metaData.date}
        onChange={(e) => meta({ date: e.target.value })}
        style={{ width: '100%', margin: 0, flex: 1, marginBottom: '.25rem' }}
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
