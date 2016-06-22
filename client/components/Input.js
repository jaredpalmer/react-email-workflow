import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
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

  componentDidMount() {
    if (this.props.autoFocus) {
      ReactDOM.findDOMNode(this.refs.myInput).focus();
    }
  }

  handleOnFocus() {
    this.setState({ focused: true });
  }

  handleOnBlur() {
    this.setState({ focused: false });
  }

  render() {
    const { style, rows, ...rest } = this.props;
    const border = this.state.focused ? '1px solid #a6aebb' : '1px solid #edeff1';
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
        ref='myInput'
        rows={rows}
        onFocus={this.handleOnFocus.bind(this)}
        onBlur={this.handleOnBlur.bind(this)}
        style={inputStyle}
        {...rest}/> : <input
                   ref='myInput'
                   onFocus={this.handleOnFocus.bind(this)}
                   onBlur={this.handleOnBlur.bind(this)}
                   style={inputStyle}
                   {...rest}/>
    );
  }
}

export default Input;
