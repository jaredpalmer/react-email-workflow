import React, { Component, PropTypes } from 'react'
import Button from './Button';
import Clipboard from 'clipboard';

class Copy extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { id } = this.props;
    new Clipboard(`#${id}`);
  }
  render() {
    const { id, children, hasCopied, onCopy, ...other } = this.props;
    return (
      <Button
        id={id}
        onClick={() => onCopy(true)}
        primary={hasCopied}
        {...other}>
        {!hasCopied ? <span><i
          className="ion ion-ios-copy"
          style={{marginRight: '.5rem'}}/> Copy </span>:
          <span><i className="ion ion-ios-copy-outline"
            style={{marginRight: '.5rem'}}
          /> Copied!</span>}
      </Button>
    );
  }
}

export default Copy;
