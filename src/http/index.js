import axios from 'axios'
import { SERVER_URI } from '../constatnts'
import { setUser } from '../components/redux/userReducer'
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator'

export const login = (userName) => async (dispatch) => {
  const { data } = await axios.get(SERVER_URI + '/auth/login', { userName })
  return dispatch(setUser(data))
}
export const auth = (userId) => async (dispatch) => {
  const { data } = await axios.post(SERVER_URI + '/auth/auth', { userId })
  return dispatch(setUser(data.user))
}

export const registration = () => async (dispatch) => {
  const randomName = uniqueNamesGenerator({
    dictionaries: [colors, animals],
  })
  const { data } = await axios.post(SERVER_URI + '/auth/registration', {
    userName: randomName,
  })
  console.log(data.user._id)
  localStorage.setItem('userId', data.user._id)
  return dispatch(setUser(data.user))
}

export const updateUser = (user) => async (dispatch) => {
  const { data } = await axios.post(SERVER_URI + '/auth/updateuser', user)

  return dispatch(setUser(data.user))
}
