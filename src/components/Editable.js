import React from 'react';

export default class ContentEditable extends React.Component {
  constructor() {
    super();
    this.state = {
      showPlaceholder: true,
    };
    this.emitChange = this.emitChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !this.htmlEl || nextProps.html !== this.htmlEl.innerHTML ||
            this.props.disabled !== nextProps.disabled ||
            this.state.showPlaceholder !== nextState.showPlaceholder;
  }

  componentDidUpdate() {
    if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
      this.htmlEl.innerHTML = this.props.html;
    }
  }

  emitChange(e) {
    if (!this.htmlEl) return;
    const html = this.htmlEl.innerHTML;
    if (e.type === 'focus' && html === '') {
      this.setState({ showPlaceholder: false });
    } else if (e.type === 'blur' && html === '') {
      this.setState({ showPlaceholder: true });
    } else {
      this.setState({ showPlaceholder: false });
    }

    if (this.props.onChange && html !== this.lastHtml) {
      e.target.value = html;
      this.props.onChange(e);
    }

    this.lastHtml = html;
  }

  handleClick() {
    this.htmlEl.focus();
  }

    render() {
      const { style, ...other } = this.props;
      const placeholderStyle = Object.assign({}, {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: this.state.showPlaceholder ? 'block' : 'none',
      }, style, { color: '#999' });
      const inputStyle = Object.assign({}, {
        outline: 'none !important',
        border: 'none !important',
        borderRadius:'2px',
        cursor: 'auto',
        WebkitAppearance: 'none', }, style);
      return (
        <span
          onClick={this.handleClick}
          style={{
          position: 'relative',
          width: '100%',
          display: 'block',
          cursor: 'auto',
        }}>{React.createElement(
        this.props.tagName || 'div',
        Object.assign({}, this.props, {
          ref: (e) => this.htmlEl = e,
          onInput: this.emitChange,
          onBlur: this.emitChange,
          contentEditable: !this.props.disabled,
          dangerouslySetInnerHTML: { __html: this.props.html },
          style: inputStyle,
        }),
        this.props.children)}
          <div style={placeholderStyle}>{this.props.placeholder}</div>
      </span>);
    }

}
