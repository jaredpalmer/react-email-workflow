import {
  ADD_ELEMENT,
  DESTROY_ELEMENT,
  EDIT_ELEMENT,
  MOVE_ELEMENT,
  EDIT_META
} from '../constants/ActionTypes';

let nextTodoId = 1;

export function add(element) {
  return {
    type: ADD_ELEMENT,
    element: {
      id: nextTodoId++,
      ...element
    }
  };
}

export function edit(id, updates) {
  return {
    type: EDIT_ELEMENT,
    id,
    updates
  };
}

export function destroy(id) {
  return {
    type: DESTROY_ELEMENT,
    id
  };
}

export function move(id, atIndex) {
  return {
    type: MOVE_ELEMENT,
    id,
    atIndex
  };
}

export function meta(meta) {
  return {
    type: EDIT_META,
    meta
  };
}
