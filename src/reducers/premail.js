import * as actions from '../actions/EmailActions';
import * as types from '../constants/ActionTypes';
import update from 'react/lib/update';
import moment from 'moment';

export default function premail(state = {
  isLoading: false,
  error: null,
  html: '',
}, action) {
  switch (action.type) {
    case types.PREMAIL_LOADING:
      return update(state, {isLoading: {$set: action.isLoading}});
    case types.PREMAIL_SUCCESS:
      return update(state, {html: {$set: action.html}});
    case types.PREMAIL_FAILURE:
      return update(state, {error: {$set: action.error}});
    default:
      return state;
  }
}
