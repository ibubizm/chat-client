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

  const { current: socket } = useRef(
    io(SERVER_URI, {
      query: {
        // avatar: user.avatar,
        roomId: user.roomId,
        userName: user.userName,
        rooms: ['mainRoom', 'second'],
      },
    })
  )

  useEffect(() => {
    socket.emit('user:add', user)

    socket.emit('user:create', user)

    socket.emit('message:get')

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

  return { users, messages, sendMessage, removeMessage }
}
