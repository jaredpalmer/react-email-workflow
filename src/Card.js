import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import {Block, Row} from 'jsxstyle';
import Button from './Button';
import Input from './Input';


const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  }
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  }
};


class Card extends Component {
  render() {
    const { id, title, content, author, url, isDragging, connectDragSource, connectDropTarget, edit , destroy} = this.props;
    const opacity = isDragging ? 0 : 1;
    const boxShadow = isDragging ?  '0px 4px 8px rgba(0,0,0,.2)' : '0px 1px 2px rgba(0,0,0,.2)' ;

    return connectDragSource(connectDropTarget(
      <div style={{
        border: '1px solid #eee',
        borderRadius: '4px',
        padding: '1rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move',
        boxShadow: '0px 1px 2px rgba(0,0,0,.2)',
        opacity: opacity
        }}>
        <Row marginBottom=".25rem">
          <Input style={{flex: 1}} onChange={(e) => edit(id, {url: e.target.value})} type="url" value={url}/>
          <Button>Fetch</Button>
        </Row>
        <Row marginBottom=".25rem">
          <Input style={{flex: 1}} onChange={(e) => edit(id, {title: e.target.value})} value={title} type="text"/>
        </Row>
        <Row marginBottom=".25rem">
          <Input style={{flex: 1}} onChange={(e) => edit(id, {content: e.target.value})} value={content} type="text"/>
        </Row>
        <Row marginBottom=".25rem">
          <div>Read More • </div>
          <Input style={{flex: 1}} onChange={(e) => edit(id, {author: e.target.value})} value={author} type="text"/>
        </Row>
        <Block><Button onClick={() => destroy(id)}>Delete</Button></Block>
      </div>
    ));
  }
}

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired,
  findCard: PropTypes.func.isRequired
};

const DragSourceComponent = DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Card);

const DropTargetComponent = DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(DragSourceComponent)

export default DropTargetComponent;
