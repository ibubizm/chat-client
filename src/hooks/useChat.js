import { SERVER_URI } from '../constatnts'
import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

export default function useChat() {
  const roomId = localStorage.getItem('roomId')
  const userName = localStorage.getItem('userName')
  const avatar = localStorage.getItem('avatar')

  const [user, setUser] = useState({
    roomId: roomId,
    userName: userName,
    avatar: avatar,
    roomAvatar: 'https://avatars.githubusercontent.com/u/66380357?v=4',
  })

  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [rooms, setRooms] = useState([])

  const { current: socket } = useRef(
    io(SERVER_URI, {
      query: {
        roomId: 'user.roomId',
        userName: user.userName,
      },
    })
  )

  useEffect(() => {
    socket.emit('message:get', roomId)
  }, [roomId])

  useEffect(() => {
    socket.emit('user:add', user)

    socket.emit('message:get', roomId)

    socket.emit('rooms:get')

    socket.on('rooms:update', (rooms) => {
      setRooms(rooms)
    })
    socket.on('user_list:update', (users) => {
      setUsers(users)
    })

    socket.on('message_list:update', (messages) => {
      setMessages(messages)
    })
  }, [])

  const sendMessage = (message) => {
    socket.emit('message:add', message)
  }

  const removeMessage = (message) => {
    socket.emit('message:remove', message)
  }

  return { users, messages, sendMessage, removeMessage, rooms, setUser, user }
}
