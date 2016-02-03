import React, { Component, PropTypes } from 'react'
import Input from './Input';

class Code extends Component {
  constructor() {
    super();
  }

  render() {
    const {id, edit, content} = this.props;
    return <Input
      rows="4"
      value={content}
      placeholder="//Code"
      onChange={(e) => edit(id, {content: e.target.value})}
      style={{fontFamily: 'Menlo', width: '100%'}}
      />;
  }
}

export default Code;
