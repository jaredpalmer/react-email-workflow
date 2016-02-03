import * as actions from '../actions/EmailActions';
import * as types from '../constants/ActionTypes';
import update from 'react/lib/update';
import moment from 'moment';

export default function meta(state = {
  subject: '',
  preheader: '',
  date: new Date()
}, action) {
  switch (action.type) {
    case types.EDIT_META:
      return update(state, {$merge: action.meta });
    default:
      return state;
  }
}
