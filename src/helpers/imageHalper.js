import { SERVER_URI } from '../constatnts'

export const getImage = (avatar) => {
  return `${SERVER_URI}/avatars/${avatar}`
}
