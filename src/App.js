import React, { Component } from 'react';
import {Block} from 'jsxstyle';
import L from './LayoutConstants';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      hovered: false
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  handleMouseEnter() {
     this.setState({hovered: true});
  }

  handleMouseLeave() {
     this.setState({hovered: false});
  }

  render() {
    return (
       <div role="button" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <Block
            marginLeft={L.gridUnit}
            color={this.state.hovered ? 'white' : 'black'}>
            Hello Worldssss
          </Block>
      </div>
    );
  }
}
