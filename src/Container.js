import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';
import uuid from 'node-uuid';
import Button from './Button';

const style = {
  width: 522
};

const cardTarget = {
  drop() {
  }
};


class Container extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.edit = this.edit.bind(this);
    this.destroy = this.destroy.bind(this);
    this.state = {
      cards: [{
        id: uuid.v4(),
        kind: 'url',
        title: '',
        url: '',
        content: '',
        author: '',
      }]
    };
  }

  moveCard(id, atIndex) {
    const { card, index } = this.findCard(id);
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1],
          [atIndex, 0, card]
        ]
      }
    }));
  }

  findCard(id) {
    const { cards } = this.state;
    const card = cards.filter(c => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card)
    };
  }

  edit(id, obj) {
    const { cards } = this.state;
    const index = cards.findIndex((el) => el.id === id);
    const card = cards[index];
    this.setState({cards: update(cards, {[index]: {$merge: obj }})});
  }

  add() {
    const { cards } = this.state;
    this.setState({cards: update(cards, {$push: [{
      id: uuid.v4(),
      kind: 'url',
      title: '',
      url: '',
      content: '',
      author: '',}]})
    });
  }

  destroy(id) {
    const { cards } = this.state;
    const index = cards.findIndex((el) => el.id === id);
    this.setState({cards: update(cards, {$splice: [[index, 1]]})});
  }

  render() {
    const { connectDropTarget } = this.props;
    const { cards } = this.state;

    return connectDropTarget(
      <div style={style}>
        {cards.map((card, i) => {
        return (
        <Card key={card.id}
          id={card.id}
          title={card.title}
          url={card.url}
          content={card.content}
          author={card.author}
          moveCard={this.moveCard}
          findCard={this.findCard}
          index={i}
          edit={this.edit}
          destroy={this.destroy}
        />
        );
        })}
        <Button onClick={() => this.add() }><i className="icon ion-link" style={{marginRight: ".5rem"}}/> Add Link </Button>
      </div>
    );
  }
}

Container.propTypes = {
  connectDropTarget: PropTypes.func.isRequired
};


const InnerComponent = DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Container);
const ComposedComponent = DragDropContext(HTML5Backend)(InnerComponent);

export default ComposedComponent;
