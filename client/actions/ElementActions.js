import { ADD_ELEMENT, DESTROY_ELEMENT, EDIT_ELEMENT, MOVE_ELEMENT, EDIT_META, SHOW_CODE } from '../constants/ActionTypes'

import { v4 } from 'uuid'

export function add (element) {
  return {
    type: ADD_ELEMENT,
    element: {
      id: v4(),
      ...element
    }
  }
}

export function edit (id, updates) {
  return {
    type: EDIT_ELEMENT,
    id,
    updates
  }
}

export function destroy (id) {
  return {
    type: DESTROY_ELEMENT,
    id
  }
}

export function move (id, atIndex) {
  return {
    type: MOVE_ELEMENT,
    id,
    atIndex
  }
}

export function meta (meta) {
  return {
    type: EDIT_META,
    meta
  }
}

export function showCode (isShowing) {
  return {
    type: SHOW_CODE,
    isShowing
  }
}

export function extract (id, url) {
  return (dispatch, getState, { axios }) => {
    return axios.post('/api/v0/extract', { url })
      .then(res => {
        dispatch(edit(id, res.data))
      })
      .catch(error => {
        console.error(`Error extracting ${url}: `, error)
        dispatch(edit(id, {
          title: error.message,
          content: '',
          author: 'ERROR'
        }))
      })
  }
}
