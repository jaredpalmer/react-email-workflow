import React, { Component, PropTypes } from 'react';
import {Flex} from 'jsxstyle';
import Center from './Center';
import L from '../LayoutConstants';

class Button extends Component {
  constructor() {
    super();
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

  render() {
    const { children, onClick, primary, small, style, ...rest } = this.props;
    return (
      <div
        role="button"
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onClick={onClick}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          backgroundColor={this.state.hovered ? L.blue : "#ffffff"}
          fontSize="14px"
          fontWeight="600"
          lineHeight={small ? 1 : 1.43}
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
            {children}
          </Flex>
      </div>
    );
  }
}

export default Button;
