import {
  ADD_ELEMENT,
  DESTROY_ELEMENT,
  EDIT_ELEMENT,
  MOVE_ELEMENT,
  EDIT_META
} from '../constants/ActionTypes';

import uuid from 'node-uuid';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ELEMENT:
      return state;
    case EDIT_ELEMENT:
      return state;
    case DESTROY_ELEMENT:
      return state;
    case MOVE_ELEMENT:
      return state;
    case EDIT_META:
      return state;
    default:
      return state;
  }
}
