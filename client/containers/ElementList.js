import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import Card from '../components/Card'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ItemTypes from '../constants/ItemTypes'
import Button from '../components/Button'
import * as ElementActions from '../actions/ElementActions'
import * as ElementSchema from '../constants/ElementSchema'
import { Row, Col, Block } from 'jsxstyle'
import { SmallText } from '../components/Type'

const cardTarget = {
  drop () {
  }
}

class ElementList extends Component {
  constructor (props) {
    super(props)
    this.findCard = this.findCard.bind(this)
  }

  findCard (id) {
    const { elements } = this.props
    const el = elements.filter(c => c.id === id)[0]

    return {
      el,
      index: elements.indexOf(el)
    }
  }

  render () {
    const { elements, actions, connectDropTarget, ...other } = this.props
    return connectDropTarget(
      <Block width='600px'>
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
              extract={actions.extract}
              {...other}
            />
          )
        })}
        <Row width='547px' flexWrap='no-wrap' marginRight='45px' marginTop='1rem'>
          <Block
            flex='1'
            marginBottom='.5rem'
            marginRight='.5rem'
          >
            <Button onClick={() => actions.add(ElementSchema.url)} primary>
              <Col fontSize='22px' justifyContent='center' alignItems='center'>
                <i className='ion ion-link' />
                <SmallText>Story</SmallText>
              </Col>
            </Button>
          </Block>
          <Block
            flex='1'
            marginBottom='.5rem'
            marginRight='.5rem'
          >
            <Button onClick={() => actions.add(ElementSchema.heading)} primary>
              <Col fontSize='1rem' justifyContent='center' alignItems='center'>
                <Block
                  fontWeight='bold'
                  fontFamily='Georgia'
                >
                  H1
                </Block>
                <SmallText>Heading</SmallText>
              </Col>
            </Button>
          </Block>
          <Block
            flex='1'
            marginBottom='.5rem'
            marginRight='.5rem'
          >
            <Button onClick={() => actions.add(ElementSchema.text)} primary>
              <Col fontSize='1rem' justifyContent='center' alignItems='center'>
                <Block
                  fontWeight='bold'
                  fontFamily='Georgia'
                  textTransform='capitalize'
                >
                  Aa
                </Block>
                <SmallText>Text</SmallText>
              </Col>
            </Button>
          </Block>
          <Block
            flex='1'
            marginBottom='.5rem'
            marginRight='.5rem'
          >
            <Button onClick={() => actions.add(ElementSchema.html)} primary>
              <Col fontSize='22px' justifyContent='center' alignItems='center'>
                <i className='ion ion-code' />
                <SmallText>HTML</SmallText>
              </Col>
            </Button>
          </Block>
        </Row>
      </Block>
    )
  }
}

ElementList.propTypes = {
  connectDropTarget: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return { elements: state.elements }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(ElementActions, dispatch) }
}

const ContainerComponent = connect(mapStateToProps, mapDispatchToProps)(ElementList)

const InnerComponent = DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(ContainerComponent)
const ComposedComponent = DragDropContext(HTML5Backend)(InnerComponent)

export default ComposedComponent
