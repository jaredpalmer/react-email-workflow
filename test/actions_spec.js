import expect from 'expect';
import * as actions from '../src/actions/ElementActions';
import * as types from '../src/constants/ActionTypes';
import * as ElementSchema from '../src/constants/ElementSchema';
import { v4 } from 'node-uuid'

describe('actions', () => {
  it('should create an action to add an element', () => {
    const expectedAction = {
      type: types.ADD_ELEMENT,
      element: {
        id: 1,
        kind: 'url',
        title: '',
        url: '',
        content: '',
        author: ''
      }
    };
    const createdAction = actions.add(ElementSchema.url)
    expect(createdAction.element.id).toBeA('string');
    createdAction.element.id = 1
    expect(createdAction).toEqual(expectedAction);
  });

  it('should create an action to edit an element', () => {
    const id = v4()
    const updates = {
      url: 'http://google.com'
    };
    const expectedAction = {
      type: types.EDIT_ELEMENT,
      id,
      updates: {
        url: 'http://google.com'
      }
    };
    expect(actions.edit(id, updates)).toEqual(expectedAction);
  });

  it('should create an action to destroy an element', () => {
    const id = v4()
    const expectedAction = {
      type: types.DESTROY_ELEMENT,
      id,
    };
    expect(actions.destroy(id)).toEqual(expectedAction);
  });

  it('should create an action to move an element', () => {
    const id = v4()
    const expectedAction = {
      type: types.MOVE_ELEMENT,
      id,
      atIndex: 1
    };
    expect(actions.move(id,1)).toEqual(expectedAction);
  });

  it('should create an action to edit meta data', () => {
    const expectedAction = {
      type: types.EDIT_META,
      meta: {subject: 'Apple goes Bankrupt'}
    };
    expect(actions.meta({subject: 'Apple goes Bankrupt'})).toEqual(expectedAction);
  });
});
