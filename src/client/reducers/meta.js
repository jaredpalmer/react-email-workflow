import * as actions from '../actions/EmailActions';
import * as types from '../constants/ActionTypes';
import update from 'react/lib/update';

export default function meta(state = {}, action) {
  switch (action.type) {
    case types.EDIT_META:
      return update(state, {$merge: action.meta });
    default:
      return state;
  }
}
