import {
  ADD_ELEMENT,
  DESTROY_ELEMENT,
  EDIT_ELEMENT,
  MOVE_ELEMENT,
  EDIT_META,
  SHOW_CODE,
  PREMAIL_COPY,
  PREMAIL_LOADING,
  PREMAIL_SUCCESS,
  PREMAIL_FAILURE
} from '../constants/ActionTypes';
import http from '../utils/HttpClient';

let nextTodoId = 1;

export function add(element) {
  return {
    type: ADD_ELEMENT,
    element: {
      id: nextTodoId++,
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

export function premailCopy(hasCopied) {
  return {
    type: PREMAIL_COPY,
    hasCopied: hasCopied,
  };
}

export function premailLoading(isLoading) {
  return {
    type: PREMAIL_LOADING,
    isLoading: isLoading,
  };
}

export function premailSuccess(html) {
  return {
    type: PREMAIL_SUCCESS,
    html,
  };
}

export function premailFailure(error) {
  return {
    type: PREMAIL_FAILURE,
    error,
  };
}

export function premail() {
  return function (dispatch, getState) {
    const { subject, preheader, date, meta, elements } = getState();
    dispatch(premailLoading(true));

    return http.post('/api/v0/premail', { subject, preheader, date, meta, elements })
      .then(result => {
        console.log(result);
        dispatch(premailLoading(false));
        return result.html;
      })
      .then(jsonResult => {
        dispatch(premailSuccess(jsonResult));
        dispatch(premailCopy(false));
      })
      .catch(err => {
        dispatch(premailFailure(err));
      });
  };
}
