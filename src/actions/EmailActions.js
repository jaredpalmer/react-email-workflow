import {
  ADD_ELEMENT,
  DESTROY_ELEMENT,
  EDIT_ELEMENT,
  MOVE_ELEMENT,
  EDIT_META,
  SHOW_CODE,
  PREMAIL_COPY,
  PREMAIL_REQUEST,
  PREMAIL_SUCCESS,
  PREMAIL_FAILURE
} from '../constants/ActionTypes';
import http from '../utils/HttpClient';
import { v4 } from 'node-uuid';

export function add(element) {
  return {
    type: ADD_ELEMENT,
    element: {
      id: v4(),
      ...element,
    },
  };
}

export function edit(id, updates) {
  return {
    type: EDIT_ELEMENT,
    id,
    updates,
  };
}

export function destroy(id) {
  return {
    type: DESTROY_ELEMENT,
    id,
  };
}

export function move(id, atIndex) {
  return {
    type: MOVE_ELEMENT,
    id,
    atIndex,
  };
}

export function meta(meta) {
  return {
    type: EDIT_META,
    meta,
  };
}

export function showCode(isShowing) {
  return {
    type: SHOW_CODE,
    isShowing,
  };
}

export function premailCopy() {
  return {
    type: PREMAIL_COPY,
  };
}

export function premail () {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: PREMAIL_REQUEST })
    const { subject, preheader, date, meta, elements } = getState();
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
