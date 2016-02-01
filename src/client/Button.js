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
    const { children, onClick, primary, style, ...rest } = this.props;
    const baseStyle = {
      background: "#fff",
      fontFamily: L.sans,
      fontSize: "14px",
      fontWeight: "bold",
      lineHeight: "1.43",
      outline: "0",
      padding: "7px 21px",
      transition: ".25s background ease, .25s border-color ease",
      userSelect: "none",
      whiteSpace: "nowrap",
      borderColor: this.state.hovered ? "#aaaaaa" : "#c4c4c4",
      borderRadius: "2px",
      border: "1px solid",
      cursor: "pointer",
      color: "#565a5c",
    };
    const normalStyle = Object.assign({}, baseStyle, style);
    const primaryStyle = Object.assign({}, normalStyle, {
      borderColor: this.state.hovered ? "#ff7e82" : "#ff5a5f",
      borderBottomColor: this.state.hovered ? "#fa0008" : "#e00007",
      background: this.state.hovered ? "#ff7e82" : "#ff5a5f",
      color: "#ffffff"
    }, style);

    return(
      <div
        role="button"
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onClick={onClick}
      >
        <Center
          style={!primary ? normalStyle : primaryStyle }
          {...rest}>
          {children}
        </Center>
      </div>
    );
  }
}

export default Button;
