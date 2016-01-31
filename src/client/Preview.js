import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Row, Block} from 'jsxstyle';
import Button from './Button';
import Premail from './sources/Premail';
import Frame from './Frame';
import OSXButton from './OSXButton';
import OSXMenuBar from './OSXMenuBar';

class Preview extends Component {
  constructor() {
    super();
    this.state = {
      html: ''
    };
  }

  render() {
    const {data} = this.props;
    return (
      <div style={{flex: '1'}}>
        <Button
            marginBottom="1rem"
            onClick={()=> Premail(data).then(res => {
              this.setState({html: res.html});
            })}>
          Preview
        </Button>
        <div style={{
          borderRadius:'6px',
          border: '1px solid #d5d5d5',
          }}>
        <OSXMenuBar/>
        <Frame style={{
            backgroundColor: 'white',
            height: '500px',
            width: '100%',
            outline: 'none',
            border: 'none'
          }}>
          <div dangerouslySetInnerHTML={{__html: this.state.html}}/>
        </Frame>
      </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { data: state }
}

export default connect(mapStateToProps)(Preview);
