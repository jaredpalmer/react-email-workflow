import React, { Component, PropTypes } from 'react';
import { Block, Flex } from 'jsxstyle';
import L from '../LayoutConstants';
import TextArea from 'react-textarea-autosize';

class Input extends Component {
  constructor() {
    super();
    this.state = {
      focused: false,
    };
  }

  handleOnFocus() {
    this.setState({ focused: true });
  }

  handleOnBlur() {
    this.setState({ focused: false });
  }

  render() {
    const { style, rows, ...rest } = this.props;
    const border = this.state.focused ? '1px solid #aaa' : '1px solid #c4c4c4';
    const defaults = {
      boxSizing: 'border-box',
      fontFamily: L.sans,
      transition: '.2s border',
      border: border,
      fontSize: '1rem',
      outline: 'none !important',
      padding: '8px 10px',
      borderRadius:'2px',
      WebkitAppearance: 'none',
      display: 'inline-block',
    };
    const inputStyle = Object.assign({}, defaults, style);
    return (
      rows ? <TextArea
        useCacheForDOMMeasurements
        rows={rows}
        onFocus={this.handleOnFocus.bind(this)}
        onBlur={this.handleOnBlur.bind(this)}
        style={inputStyle}
        {...rest}/> : <input
                   onFocus={this.handleOnFocus.bind(this)}
                   onBlur={this.handleOnBlur.bind(this)}
                   style={inputStyle}
                   {...rest}/>
    );
  }
}

export default Input;
