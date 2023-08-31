import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  user: {},
}

export const updateUser = createAction('UPDATE_USER')
export const setUser = createAction('SET_USER')

export default createReducer(initialState, {
  [setUser]: (state, action) => {
    state.user = action.payload
  },
  [updateUser]: (state, action) => {
    state.user = state
  },
})
