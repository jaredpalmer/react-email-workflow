import React, { Component, PropTypes } from 'react';
import Center from './Center';
import {Flex} from 'jsxstyle';
import L from './LayoutConstants';

class Button extends Component {
  constructor() {
    super();
    this.state = {
      hovered: false
    };
  }

  handleMouseEnter() {
     this.setState({hovered: true});
  }

  handleMouseLeave() {
     this.setState({hovered: false});
  }

  render() {
    const { children, onClick, ...rest } = this.props;
    return(
      <div
        role="button"
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onClick={onClick}
      >
        <Center background={this.state.hovered ? L.primaryColor : L.secondaryColor}
          fontFamily={L.sans}
          padding={L.gridUnit}
          color="white"
          transition=".3s color ease"
          {...rest}>
          {children}
        </Center>
      </div>
    );
  }
}

export default Button;
