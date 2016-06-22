/* eslint-env mocha */
import expect from 'expect'
import * as actions from '../client/actions/ElementActions'
import * as ElementSchema from '../client/constants/ElementSchema'

import elements from '../client/reducers/elements'
import meta from '../client/reducers/meta'

describe('reducer', () => {
  it('should return default state if action is undefined', () => {
    const initialState = []
    const nextState = elements(initialState, 'BLAH')
    expect(nextState).toEqual(initialState)
  })

  it('should handle ADD_ELEMENT', () => {
    const initialState = []
    const nextState = elements(initialState, actions.add(ElementSchema.url))
    expect(nextState[0].id).toBeA('string')
    expect(nextState[0].kind).toEqual('url')
  })

  it('should handle EDIT_ELEMENT', () => {
    const initialState = [{
      id: 1,
      kind: 'url',
      title: '',
      url: '',
      content: '',
      author: ''
    }]
    const nextState = elements(initialState, actions.edit(1, { title: 'Hello!' }))
    expect(nextState).toEqual([{
      id: 1,
      kind: 'url',
      title: 'Hello!',
      url: '',
      content: '',
      author: ''
    }])
  })

  it('should handle DESTROY_ELEMENT', () => {
    const initialState = [{
      id: 1,
      kind: 'url',
      title: '',
      url: '',
      content: '',
      author: ''
    }]
    const nextState = elements(initialState, actions.destroy(1))
    expect(nextState).toEqual([])
  })

  it('should handle MOVE_ELEMENT', () => {
    const initialState = [
      {
        id: 1,
        title: 'Google'
      },
      {
        id: 2,
        title: 'Apple'
      },
      {
        id: 3,
        title: 'FB'
      }
    ]
    const nextState = elements(initialState, actions.move(1, 1))
    expect(nextState).toEqual([
      {
        id: 2,
        title: 'Apple'
      },
      {
        id: 1,
        title: 'Google'
      },
      {
        id: 3,
        title: 'FB'
      }
    ])
  })

  it('should return default state if meta action is undefined', () => {
    const initialState = []
    const nextState = meta(initialState, 'BLAH')
    expect(nextState).toEqual(initialState)
  })

  it('should handle EDIT_META', () => {
    const initialState = {
      subject: '',
      preheader: '',
      date: ''
    }
    const nextState = meta(initialState, actions.meta({ subject: 'Hello' }))
    expect(nextState).toEqual({
      subject: 'Hello',
      preheader: '',
      date: ''
    })
  })
})
