import React, { Component, PropTypes } from 'react';
import Button from './Button';
import Clipboard from 'clipboard';
import { Flex } from 'jsxstyle';
import L from '../LayoutConstants';

class Copy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
  }

  handleMouseEnter() {
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    this.setState({ hovered: false });
  }

  componentDidMount() {
    const { id } = this.props;
    new Clipboard(`#${id}`);
  }

  render() {
    const { id, children, hasCopied, text, onCopy, ...other } = this.props;
    return (
      <div
        id={id}
        role="button"
        onClick={() => onCopy(true)}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        style={{
          background: hasCopied ? '#b7b7b7' : 'white',
        }}
        data-clipboard-text={text}
        {...other}>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            backgroundColor={this.state.hovered ? L.blue : "#ffffff"}
            fontSize="14px"
            fontWeight="600"
            lineHeight={1}
            outline="0"
            borderRadius="2px"
            padding="8px 20px"
            transition=".25s background ease, .25s color ease"
            userSelect="none"
            whiteSpace="nowrap"
            borderColor={L.blue}
            border="1px solid"
            cursor="pointer"
            color={this.state.hovered ? "#ffffff" : L.blue }>
        {!hasCopied ? <span><i
          className="ion ion-ios-copy"
          style={{ marginRight: '.5rem' }}/> Copy </span> :
          <span><i className="ion ion-ios-copy-outline"
            style={{ marginRight: '.5rem' }}
          /> Copied!</span>}
          </Flex>
      </div>
    );
  }
}

export default Copy;
