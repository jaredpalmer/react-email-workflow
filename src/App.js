import React, { Component } from 'react';
import {Block, Flex} from 'jsxstyle';
import Center from './Center';
import Button from './Button';

import L from './LayoutConstants';

export class App extends Component {
  render() {
    return (
      <div>
        <h1 fontFamily={L.sans}>Redux Email Helper</h1>
        <Flex>
          <input type="text"/>
          <Button marginLeft={L.gridUnit} onClick={() => alert('Yo')}>Hello</Button>
          <Button marginLeft={L.gridUnit}>Hello</Button>
        </Flex>
        <Block>
          <input type="text"/>
        </Block>
        <Block>
          <input type="date"/>
        </Block>
      </div>
    );
  }
}
