import * as types from '../constants/ActionTypes'
import update from 'react/lib/update'

export default function premail (state = {
  isLoading: false,
  error: null,
  html: '',
  hasCopied: false
}, action) {
  switch (action.type) {
    case types.PREMAIL_REQUEST:
      return update(state, { isLoading: { $set: true } })
    case types.PREMAIL_SUCCESS:
      return update(state, {
        html: { $set: action.payload },
        isLoading: { $set: false },
        hasCopied: { $set: false }
      })
    case types.PREMAIL_FAILURE:
      return update(state, {
        error: { $set: action.payload },
        isLoading: { $set: false }
      })
    case types.PREMAIL_COPY:
      return update(state, { hasCopied: { $set: true } })
    default:
      return state
  }
}
