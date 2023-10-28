import axios from 'axios'
import { SERVER_URI } from '../constatnts'
import { setUser } from '../components/redux/userReducer'
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator'
import {
  addRoomToSubscribe,
  removeRoomToSubscribe,
  setRooms,
  updateRooms,
} from '../components/redux/roomReducer'

export const getUsersRooms = (userId) => async (dispatch) => {
  const { data } = await axios.post(
    SERVER_URI + '/rooms/getRooms',
    { userId },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  )
  return dispatch(setRooms(data.rooms))
}

export const updateUsersRooms = (roomId, lastMessage) => async (dispatch) => {
  const { data } = await axios.post(
    SERVER_URI + '/rooms/updateRooms',
    { roomId, lastMessage },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  )
  return dispatch(updateRooms(data.rooms))
}

export const login = (userName) => async (dispatch) => {
  const { data } = await axios.get(
    SERVER_URI + '/auth/login',
    { userName },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  )

  return dispatch(setUser(data))
}
export const auth = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      SERVER_URI + '/auth/auth',
      { userId },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    )
    return dispatch(setUser(data.user))
  } catch (e) {
    localStorage.removeItem('userId')
  }
}

export const registration = () => async (dispatch) => {
  const randomName = uniqueNamesGenerator({
    dictionaries: [colors, animals],
  })
  const { data } = await axios.post(
    SERVER_URI + '/auth/registration',
    {
      userName: randomName,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  )

  localStorage.setItem('userId', data.user._id)
  return dispatch(setUser(data.user))
}

export const updateUser = (user) => async (dispatch) => {
  const { data } = await axios.post(SERVER_URI + '/auth/updateuser', user)
  return dispatch(setUser(data.user))
}

export const createChat = (room) => async (dispatch) => {
  const { data } = await axios.post(SERVER_URI + '/rooms/createRoom', room)
  return dispatch(addRoomToSubscribe(data.room))
}

export const subscribe = (userId, roomId) => async (dispatch) => {
  try {
    const { data } = await axios.post(SERVER_URI + '/rooms/subscribe', {
      userId,
      roomId,
    })
    console.log(data, 'sub')
    // dispatch(setUser(data.user))
    dispatch(addRoomToSubscribe({ room: data.room, userId }))
    // dispatch(addRoomToSubscribe({ room: data.room, userId }))
  } catch (e) {
    console.log(e)
  }
}

export const unsubscribe = (userId, roomId) => async (dispatch) => {
  try {
    const { data } = await axios.post(SERVER_URI + '/rooms/unsubscribe', {
      userId,
      roomId,
    })

    console.log(data, 'unsub')
    // dispatch(setUser(data.user))
    // console.log(data, 'unsub')
    dispatch(removeRoomToSubscribe({ room: data.room, userId }))
  } catch (e) {
    console.log(e)
  }
}

export const getSubscribers = async (roomId) => {
  try {
    const { data } = await axios.post(SERVER_URI + '/rooms/getSubscribers', {
      roomId,
    })
    return data
  } catch (e) {
    console.log(e)
  }
}
