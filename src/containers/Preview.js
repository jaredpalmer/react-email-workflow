import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Row, Col, Block} from 'jsxstyle';
import Button from '../components/Button';
import OSXButton from '../components/OSXButton';
import L from '../LayoutConstants';
import PreviewHTML from '../components/PreviewHTML';
import PreviewVisual from '../components/PreviewVisual';
import PreviewLoading from '../components/PreviewLoading';
import { premail, premailCopy } from '../actions/EmailActions';
import Copy from '../components/Copy';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.startPoll = this.startPoll.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timeout);
    if (this.props.html !== nextProps.html) {
        // Optionally do something with data
    }
    if (!nextProps.isLoading) {
        this.startPoll();
    }
  }

  componentWillMount() {
    this.props.premail();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  startPoll() {
    this.timeout = setTimeout(() => this.props.premail(), 10000);
  }
  render() {
    const {isLoading, html, error, premail, premailCopy, hasCopied } = this.props;
    return (
      <Col position="fixed"
          top="4rem"
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
                <Copy
                    hasCopied={hasCopied}
                    id="copy"
                    data-clipboard-text={html}
                    onCopy={premailCopy}
                    style={{ lineHeight: '1', marginRight: '1rem'}}
                />
                <Button
                    style={{ lineHeight: '1'}}
                    onClick={() => premail()} primary>
                  <i className="ion ion-refresh" style={{marginRight: '.5rem'}}/>Refresh
                </Button>
              </Row>
            </Row>
          {isLoading ? <PreviewLoading/> :
          <PreviewVisual style={{flex: 1}} source={html}/>}
          {error !== null ? <h2 style={{color: L.pink}}>{error}</h2> : null}
        </Col>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {
    html: state.premail.html,
    isLoading: state.premail.isLoading,
    error: state.premail.error,
    hasCopied: state.premail.hasCopied
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ premail, premailCopy }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
