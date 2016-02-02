import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Button from './Button';
import Premail from './sources/Premail';

const Submit= ({ data }) =>
  <Button
    onClick={()=> Premail(data).then(res => console.log(res))}>
    Submit
  </Button>;

function mapStateToProps(state) {
  return { data: state }
}

export default connect(mapStateToProps)(Submit);
