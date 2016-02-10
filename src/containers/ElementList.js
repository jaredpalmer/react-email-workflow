import React, { Component, PropTypes } from 'react';
import { bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import update from 'react/lib/update';
import Card from '../components/Card';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from '../constants/ItemTypes';
import Button from '../components/Button';
import * as EmailActions from '../actions/EmailActions';
import * as ElementSchema from '../constants/ElementSchema';
import { Row, InlineBlock} from 'jsxstyle';

const style = {
  width: 600,
};

const cardTarget = {
  drop() {
  },
};

class ElementList extends Component {
  constructor(props) {
    super(props);
    this.findCard = this.findCard.bind(this);
  }

  findCard(id) {
    const { elements } = this.props;
    const el = elements.filter(c => c.id === id)[0];

    return {
      el,
      index: elements.indexOf(el),
    };
  }

  render() {
    const { elements, actions, connectDropTarget, ...other } = this.props;
    return connectDropTarget(
      <Block width="600px">
        {elements.map((card, i) => {
          return (
            <Card key={card.id}
              card={card}
              id={card.id}
              moveCard={actions.move}
              findCard={this.findCard}
              index={i}
              edit={actions.edit}
              destroy={actions.destroy}
              {...other}
            />
          );
        })}
        <Block marginTop="1rem">
          <Row>
            <Block flex="1"
                   marginBottom=".5rem"
                   marginRight=".5rem">
              <Button onClick={() => actions.add(ElementSchema.url) } primary>
                <i className="ion ion-link" style={{ marginRight: '.5rem' }} />
                Story
              </Button>
            </Block>
            <Block flex="1"
                   marginBottom=".5rem"
                   marginRight=".5rem">
              <Button onClick={() => actions.add(ElementSchema.heading) } primary>
                <InlineBlock fontWeight="bold"
                             fontFamily="Georgia"
                             marginRight=".5rem">
                  H1
                </InlineBlock>
                Heading
              </Button>
            </Block>
            <Block flex="1"
                   marginBottom=".5rem"
                   marginRight=".5rem">
              <Button onClick={() => actions.add(ElementSchema.test) } primary>
                <InlineBlock fontWeight="bold"
                             marginRight=".5rem"
                             fontWeight="bold"
                             textTransform="capitalize">
                  Aa
                </InlineBlock>
                Text
              </Button>
            </Block>
            <Block flex="1"
                   marginBottom=".5rem">
              <Button onClick={() => actions.add(ElementSchema.html) } primary><i className="ion ion-code" style={{ marginRight: '.5rem' }}/>HTML </Button>
            </Block>
          </Row>
        </Block>
      </Block>
    );
  }
}

ElementList.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { elements: state.elements };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(EmailActions, dispatch) };
}

const ContainerComponent = connect(mapStateToProps, mapDispatchToProps)(ElementList);

const InnerComponent = DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(ContainerComponent);
const ComposedComponent = DragDropContext(HTML5Backend)(InnerComponent);

export default ComposedComponent;
