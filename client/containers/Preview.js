import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Block } from 'jsxstyle';
import Button from '../components/Button';
import L from '../LayoutConstants';
import PreviewHTML from '../components/PreviewHTML';
import PreviewVisual from '../components/PreviewVisual';
import PreviewLoading from '../components/PreviewLoading';
import { premail, premailCopy } from '../actions/PremailActions';
import Copy from '../components/Copy';
import { Text5 } from '../components/Type';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHTML: false,
      showNuke: false,
    };
    this.startPoll = this.startPoll.bind(this);
    this.toggleHTML = this.toggleHTML.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    const { meta, elements, isLoading } = this.props;
    clearTimeout(this.timeout);
    if (
      (meta !== prevProps.meta || elements !== prevProps.elements) &&
      !isLoading
    ) {
      this.startPoll();
    }

    if (prevState.showNuke !== this.state.showNuke) {
      if (this.state.showNuke) {
        setTimeout(() => {
          this.setState({ showNuke: false });
        }, 4000);
      }
    }
  }

  componentDidMount() {
    this.props.premail();
  }

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
    const {
      isLoading,
      html,
      error,
      premail,
      premailCopy,
      hasCopied,
    } = this.props;
    const { showHTML } = this.state;
    return (
      <Col
        position="fixed"
        top="50px"
        left="616px"
        height="calc(100% - 50px)"
        width="calc(100% - 616px)"
        alignContent="stretch"
      >
        <Col height="100%">
          <Row
            position="relative"
            height="42px"
            padding="0 1rem"
            backgroundColor="white"
            borderBottom="1px solid #ddd"
            lineHeight="42px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Block marginRight="1rem">
              <Text5 color={L.darkBlue}>Preview</Text5>
            </Block>
            <Row flex="1" alignItems="center" justifyContent="flex-end">
              <Block marginRight=".5rem">
                {html ? (
                  <Copy
                    hasCopied={hasCopied}
                    id="copy"
                    text={html}
                    onCopy={premailCopy}
                  />
                ) : null}
              </Block>
              <Block marginRight=".5rem">
                <Button onClick={premail} small="true">
                  <span>
                    <i
                      className="ion ion-refresh"
                      style={{ marginRight: '.5rem' }}
                    />
                    Refresh
                  </span>
                </Button>
              </Block>
              <Block marginRight=".5rem">
                <Button onClick={this.toggleHTML} small="true">
                  {!showHTML && (
                    <span>
                      <i
                        className="ion ion-code"
                        style={{ marginRight: '.5rem' }}
                      />
                      Show HTML
                    </span>
                  )}
                  {showHTML && (
                    <span>
                      <i
                        className="ion ion-eye"
                        style={{ marginRight: '.5rem' }}
                      />
                      Show Preview
                    </span>
                  )}
                </Button>
              </Block>
              <Block>
                {this.state.showNuke ? (
                  <Button
                    onClick={() => {
                      window.localStorage.removeItem('state');
                      window.location.href = '/';
                    }}
                    small="true"
                  >
                    <span>
                      <i
                        className="ion ion-trash"
                        style={{ marginRight: '.5rem' }}
                      />
                      Are you sure?
                    </span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      this.setState({ showNuke: true });
                    }}
                    small="true"
                  >
                    <span>
                      <i
                        className="ion ion-ios-trash"
                        style={{ marginRight: '.5rem' }}
                      />
                      Nuke
                    </span>
                  </Button>
                )}
              </Block>
            </Row>
          </Row>
          {isLoading && <PreviewLoading />}
          {!showHTML && !isLoading && (
            <PreviewVisual style={{ flex: 1 }} source={html} />
          )}
          {showHTML && !isLoading && (
            <PreviewHTML style={{ flex: 1 }} source={html} />
          )}
          {error !== null ? (
            <div
              style={{
                color: 'red',
                fontFamily: 'monospace',
                padding: '1rem',
                margin: '1rem',
                backgroundColor: '#FFBDBD',
                fontWeight: 'bold',
              }}
            >
              {JSON.stringify(error, null, 2)}
            </div>
          ) : null}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
