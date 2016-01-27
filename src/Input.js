import React, { Component, PropTypes } from 'react';
import { Block, Flex } from 'jsxstyle';
import L from './LayoutConstants';

class Input extends Component {
  constructor() {
    super();
    this.state = {
      focused: false
    };
  }

  handleOnFocus() {
    this.setState({focused: true});
  }

  handleOnBlur() {
    this.setState({focused: false});
  }

  render() {
    const { ...rest } = this.props;
    const border = this.state.focused ? '1px solid #000' : '1px solid #eee';
    return (
      <input
        onFocus={this.handleOnFocus.bind(this)}
        onBlur={this.handleOnBlur.bind(this)}
        style={{
          fontFamily: L.sans,
          transition: '.25s border ease',
          border: border,
          outline: '0 !important'
        }}
        {...rest}/>
    );
  }
}


export default Input;
