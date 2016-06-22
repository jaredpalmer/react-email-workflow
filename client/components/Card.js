import React, { Component } from 'react'
import ItemTypes from '../constants/ItemTypes'
import { DragSource, DropTarget } from 'react-dnd'
import L from '../LayoutConstants'
import Url from './Url'
import { Block, Row } from 'jsxstyle'
import Code from './Code'
import Heading from './Heading'
import Text from './Text'

const cardSource = {
  beginDrag (props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index
    }
  },

  endDrag (props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem()
    const didDrop = monitor.didDrop()

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex)
    }
  }
}

const cardTarget = {
  canDrop () {
    return false
  },

  hover (props, monitor) {
    const { id: draggedId } = monitor.getItem()
    const { id: overId } = props

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId)
      props.moveCard(draggedId, overIndex)
    }
  }
}

class Card extends Component {
  constructor () {
    super()
    this.state = {
      hovered: false
    }
  }

  handleMouseEnter () {
    this.setState({ hovered: true })
  }

  handleMouseLeave () {
    this.setState({ hovered: false })
  }

  render () {
    const { card, isDragging, connectDragSource, connectDropTarget, edit, destroy, extract } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(connectDropTarget(
      <div onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} style={{opacity: opacity}}>
        <Row>
          <Block
            background='#fff'
            width='100%'
            margin={'.5rem 0'}
            boxShadow={this.state.hovered ? '0px 6px 12px 0px rgba(0,0,0,0.3)' : '0 3px 4px 0 rgba(0,0,0,.1)'}
            transition='.2s box-shadow cubic-bezier(0.4, 0, 0.2, 1)'
            borderRadius='2px'
            padding='1rem'
            cursor='move'>
            {card.kind === 'url'
              ? <Url id={card.id} title={card.title} content={card.content} author={card.author} url={card.url} edit={edit} extract={extract} />
              : null}
            {card.kind === 'html' ? <Code id={card.id} content={card.content} edit={edit} /> : null}
            {card.kind === 'text' ? <Text id={card.id} content={card.content} edit={edit} /> : null}
            {card.kind === 'heading' ? <Heading id={card.id} content={card.content} edit={edit} /> : null}
          </Block>
          <Block padding={'1.5rem'} fontSize={L.gridUnit * 2}>
            <i onClick={() => destroy(card.id)} className='ion ion-ios-trash' style={{ fontSize: '1.5rem', opacity: opacity, cursor: 'pointer !important' }} />
          </Block>
        </Row>
      </div>
    ))
  }
}

const DragSourceComponent = DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Card)

const DropTargetComponent = DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(DragSourceComponent)

export default DropTargetComponent
