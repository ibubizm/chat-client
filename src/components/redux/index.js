import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import roomReducer from './roomReducer'

const rootReducer = combineReducers({
  userReducer,
  roomReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
