import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Block } from 'jsxstyle';
import Button from '../components/Button';
import L from '../LayoutConstants';
import PreviewHTML from '../components/PreviewHTML';
import PreviewVisual from '../components/PreviewVisual';
import PreviewLoading from '../components/PreviewLoading';
import { premail, premailCopy } from '../actions/EmailActions';
import Copy from '../components/Copy';
import { H5 } from '../components/Type';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHTML: false,
    };
    this.startPoll = this.startPoll.bind(this);
    this.toggleHTML = this.toggleHTML.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { meta, elements, isLoading } = this.props;
    clearTimeout(this.timeout);
    if (((meta !== nextProps.meta) || (elements !== nextProps.elements)) && !isLoading) {
      this.startPoll();
    }
  }

  // componentDidMount() {
  //   this.props.premail();
  // }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  startPoll() {
    this.timeout = setTimeout(() => this.props.premail(), 2000);
  }

  toggleHTML() {
    this.setState({
      showHTML: !this.state.showHTML,
    });
  }

  render() {
    const { isLoading, html, error, premail, premailCopy, hasCopied } = this.props;
    const { showHTML } = this.state;
    return (
      <Col position="fixed"
          top="50px"
          left="616px"
          height="calc(100% - 50px)"
          width="calc(100% - 616px)"
          alignContent="stretch">
        <Col
            height="100%">
            <Row position='relative'
                 height='42px'
                 padding='0 1rem'
                 backgroundColor='white'
                 borderBottom='1px solid #ddd'
                 lineHeight='42px'
                 alignItems='center'
                 justifyContent='space-between'>
                <Block flex="2">
                  <Button onClick={() => this.toggleHTML()} primary small>
                    {!showHTML && <span><i className="ion ion-code" style={{ marginRight: '.5rem' }}/>Show HTML</span>}
                    {showHTML && <span><i className="ion ion-eye" style={{ marginRight: '.5rem' }}/>Show Preview</span>}
                  </Button>
                </Block>
              <Block flex="3" marginRight="1rem" textAlign="center"><H5>Preview</H5></Block>
              <Row flex="2" alignItems="center" justifyContent="flex-end">
                <Block marginRight=".5rem">
                  <Copy
                      hasCopied={hasCopied}
                      id="copy"
                      data-clipboard-text={html}
                      onCopy={premailCopy}
                      small
                  />
                </Block>
                <Block>
                  <Button
                      onClick={() => premail()} primary small>
                    <i className="ion ion-refresh" style={{ marginRight: '.5rem' }}/>Refresh
                  </Button>
                </Block>
              </Row>
            </Row>
          {isLoading && <PreviewLoading/> }
          {!showHTML && !isLoading && <PreviewVisual style={{ flex: 1 }} source={html}/>}
          {showHTML && !isLoading && <PreviewHTML style={{ flex: 1 }} source={html}/>}
          {error !== null ? <h2 style={{ color: L.pink }}>{error}</h2> : null}
        </Col>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {
    meta: state.meta,
    elements: state.elements,
    html: state.premail.html,
    isLoading: state.premail.isLoading,
    error: state.premail.error,
    hasCopied: state.premail.hasCopied,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ premail, premailCopy }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
