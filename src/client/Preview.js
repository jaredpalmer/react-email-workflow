import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Row, Col, Block} from 'jsxstyle';
import Button from './Button';
import Premail from './sources/Premail';
import OSXButton from './OSXButton';
import OSXMenuBar from './OSXMenuBar';
import Copy from 'react-copy-to-clipboard';
import L from './LayoutConstants';
import PreviewHTML from './PreviewHTML';
import PreviewVisual from './PreviewVisual';

class Preview extends Component {
  constructor() {
    super();
    this.state = {
      html: '',
      showCode: false
    };
  }

  render() {
    const {data} = this.props;
    return (
      <Col position="fixed"
          top="1rem"
          right="1rem"
          height="calc(100% - 6rem)"
          width="50%"
          alignContent="stretch">
        <Row marginBottom="1rem">
          <Button
              style={{marginRight: '.5rem'}}
              onClick={()=> Premail(data).then(res => {
                this.setState({html: res.html});
              })}>
            <i className="ion ion-refresh" style={{marginRight: '.5rem'}}></i>Refresh
          </Button>
          <Button
              style={{marginRight: '.5rem'}}
              onClick={()=> this.setState({showCode: !this.state.showCode })}>
            <i className="ion ion-code" style={{marginRight: '.5rem'}}></i>Toggle Code
          </Button>
          <Copy text={this.state.html}>
            <Button>
              <i className="ion ion-ios-copy" style={{marginRight: '.5rem'}}></i>Copy to Clipboard
            </Button>
          </Copy>
        </Row>
        <Col
            borderRadius="6px"
            border="1px solid #d5d5d5"
            height="100%">
          <OSXMenuBar/>
          {this.state.showCode ? <PreviewHTML style={{flex: 1}} source={this.state.html}/> :
          <PreviewVisual style={{flex: 1}} source={this.state.html}/>}
        </Col>

      </Col>
    );
  }

}

function mapStateToProps(state) {
  return { data: state }
}

export default connect(mapStateToProps)(Preview);
