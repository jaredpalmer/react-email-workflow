// https://github.com/JedWatson/react-codemirror

let CM;

if (typeof navigator !== 'undefined') {
  CM = require('codemirror');
  require('codemirror/keymap/sublime');
}

const React = require('react');
const className = require('classnames');

class CodeMirror extends React.Component {
  state = {
    isFocused: false,
  };

  componentDidMount() {
    const textareaNode = this.refs.textarea;
    this.codeMirror = CM.fromTextArea(textareaNode, this.props.options);
    this.codeMirror.on('change', this.codemirrorValueChanged);
    this.codeMirror.on('focus', this.focusChanged.bind(this, true));
    this.codeMirror.on('blur', this.focusChanged.bind(this, false));
    this._currentCodemirrorValue =
      this.props.defaultValue || this.props.value || '';
    this.codeMirror.setValue(this._currentCodemirrorValue);
  }

  componentWillUnmount() {
    // todo: is there a lighter-weight way to remove the cm instance?
    if (this.codeMirror) {
      this.codeMirror.toTextArea();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.codeMirror &&
      prevProps.value !== undefined &&
      this._currentCodemirrorValue !== this.props.value
    ) {
      this.codeMirror.setValue(this.Props.value);
    }

    if (typeof this.props.options === 'object') {
      for (let optionName in this.props.options) {
        if (this.props.options.hasOwnProperty(optionName)) {
          this.codeMirror.setOption(optionName, this.props.options[optionName]);
        }
      }
    }
  }

  getCodeMirror = () => {
    return this.codeMirror;
  };

  focus = () => {
    if (this.codeMirror) {
      this.codeMirror.focus();
    }
  };

  focusChanged = focused => {
    this.setState({
      isFocused: focused,
    });
    this.props.onFocusChange && this.props.onFocusChange(focused);
  };

  codemirrorValueChanged = (doc, change) => {
    const newValue = doc.getValue();
    this._currentCodemirrorValue = newValue;
    this.props.onChange && this.props.onChange(newValue);
  };

  render() {
    const editorClassName = className(
      'ReactCodeMirror',
      this.state.isFocused ? 'ReactCodeMirror--focused' : null,
      this.props.className
    );
    return (
      <div className={editorClassName}>
        <textarea
          ref="textarea"
          name={this.props.path}
          defaultValue={this.props.value}
          autoComplete="off"
        />
      </div>
    );
  }
}

module.exports = CodeMirror;
