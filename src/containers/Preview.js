import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Row, Col, Block} from 'jsxstyle';
import Button from '../components/Button';
import Premail from '../sources/Premail';
import OSXButton from '../components/OSXButton';
import L from '../LayoutConstants';
import PreviewHTML from '../components/PreviewHTML';
import PreviewVisual from '../components/PreviewVisual';

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
        <Col
            borderRadius="6px"
            border="1px solid #d5d5d5"
            height="100%">
            <Row style={{
                position: 'relative',
                height: '42px',
                padding: '0 1rem',
                backgroundColor: 'white',
                borderBottom: '1px solid #ddd',
                lineHeight: '42px',
                borderTopRightRadius: '6px',
                borderTopLeftRadius: '6px',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <Block flex='1'>
                <OSXButton/>
                <OSXButton/>
                <OSXButton/>
              </Block>
              <Row alignItems="center">
                <Button
                    style={{lineHeight: '1', marginRight: '.5rem'}}
                    onClick={()=> this.setState({showCode: !this.state.showCode })}>
                  <i className="ion ion-code" style={{marginRight: '.5rem'}}></i>Toggle Code
                </Button>
                <Button
                    style={{ lineHeight: '1'}}
                    onClick={()=> Premail(data).then(res => {
                      this.setState({html: res.html});
                    })} primary>
                  <i className="ion ion-refresh" style={{marginRight: '.5rem'}}></i>Refresh
                </Button>
              </Row>
            </Row>
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
