import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  currentRoom: {},
  rooms: [],
}

export const setRoom = createAction('SET_ROOM')
export const setRooms = createAction('SET_ROOMS')
export const updateRooms = createAction('UPDATE_ROOMS')
export const addRoomToSubscribe = createAction('ADD_TO_SUBSCRIBE')
export const removeRoomToSubscribe = createAction('REMOVE_TO_SUBSCRIBE')

export default createReducer(initialState, {
  [setRoom]: (state, action) => {
    state.currentRoom = action.payload
  },
  [setRooms]: (state, action) => {
    state.rooms = action.payload
  },
  [updateRooms]: (state, action) => {
    const a = state.rooms.find((i) => i._id === action.payload._id)
    a.lastMessage = action.payload.lastMessage
  },
  [addRoomToSubscribe]: (state, action) => {
    state.rooms.push(action.payload)
  },
  [removeRoomToSubscribe]: (state, action) => {
    const newRoom = state.rooms.filter((i) => i._id !== action.payload._id)
    state.rooms = newRoom
  },
})
