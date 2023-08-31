import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import roomReducer from './roomReducer'

const rootReducer = combineReducers({
  toolkit: userReducer,
  room: roomReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
