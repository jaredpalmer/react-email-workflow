import React, { Component } from 'react'
import CodeMirror from './CodeMirror'

class Code extends Component {
  constructor () {
    super()
    this.updateCode = this.updateCode.bind(this)
  }

  updateCode (newCode) {
    this.props.edit(this.props.id, { content: newCode })
  }

  render () {
    return (
      <CodeMirror
        value={this.props.content}
        onChange={(newCode) => this.updateCode(newCode)}
        className='CodeMirrorSmall'
        style={{ height: 100, width: '100%', border: '1px solid #c4c4c4' }}
        options={{ mode: 'htmlmixed', lineWrapping: true, lineNumbers: true, theme: 'blackboard', keyMap: 'sublime' }}
      />
    )
  }
}

export default Code
