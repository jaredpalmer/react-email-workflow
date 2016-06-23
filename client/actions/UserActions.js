import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../constants/ActionTypes'

export function premail () {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: LOGIN_REQUEST })
    const { subject, preheader, date, meta, elements } = getState()
    return axios.post('/api/v0/premail', { subject, preheader, date, meta, elements })
      .then(res => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.html,
          meta: {
            lastFetched: Date.now()
          }
        })
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${PREMAIL_SUCCESS}: `, error)
        dispatch({
          type: LOGIN_FAILURE,
          payload: error,
          error: true
        })
      })
  }
}
