/* global localStorage */
// Shamelessly stolen from Dan Abramov
// https://github.com/gaearon/todos/blob/04-refactoring-entry-point/src/localStorage.js

// Loads Redux State from storage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

// Saves Redux State from storage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // Ignore write errors.
  }
}
