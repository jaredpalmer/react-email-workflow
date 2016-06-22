import {
  PREMAIL_COPY,
  PREMAIL_REQUEST,
  PREMAIL_SUCCESS,
  PREMAIL_FAILURE
} from '../constants/ActionTypes'

export function premailCopy () {
  return {
    type: PREMAIL_COPY
  }
}

export function premail () {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: PREMAIL_REQUEST })
    const { subject, preheader, date, meta, elements } = getState()
    return axios.post('/api/v0/premail', { subject, preheader, date, meta, elements })
      .then(res => {
        dispatch({
          type: PREMAIL_SUCCESS,
          payload: res.data.html,
          meta: {
            lastFetched: Date.now()
          }
        })
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${PREMAIL_SUCCESS}: `, error)
        dispatch({
          type: PREMAIL_FAILURE,
          payload: error,
          error: true
        })
      })
  }
}
