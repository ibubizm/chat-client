import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  currentRoom: {},
}

export const setRoom = createAction('SET_ROOM')

export default createReducer(initialState, {
  [setRoom]: (state, action) => {
    state.currentRoom = action.payload
  },
})
