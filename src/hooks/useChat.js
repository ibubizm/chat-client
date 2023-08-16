import { SERVER_URI } from '../constatnts'
import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

export default function useChat() {
  const socket = useRef(null)
  const roomId = localStorage.getItem('roomId')
  const userName = localStorage.getItem('userName')
  const avatar = localStorage.getItem('avatar')

  const [user, setUser] = useState({
    roomId: roomId,
    userName: userName,
    avatar: avatar,
    roomAvatar: 'https://avatars.githubusercontent.com/u/66380357?v=4',
  })

  const [messages, setMessages] = useState([])
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    socket.current = io(SERVER_URI, {
      query: {
        roomId,
        userName: user.userName,
      },
    })

    socket.current.emit('user:add', user)

    socket.current.emit('message:get', roomId)

    socket.current.emit('room:get')

    socket.current.on('room_list:update', (rooms) => {
      setRooms(rooms)
    })

    socket.current.on('message_list:update', (messages) => {
      setMessages(messages)
      setLoading(false)
    })

    socket.current.on('rooms:all', (rooms) => {
      setRooms(rooms)
    })

    return () => {
      socket.current.disconnect()
    }
  }, [roomId])

  const createRoom = (room) => {
    socket.current.emit('rooms:create', room)
  }

  const sendMessage = (message) => {
    socket.current.emit('message:add', message)
  }

  const roomUpdate = (mes) => {
    socket.current.emit('room:update', mes)
  }

  const removeMessage = (message) => {
    socket.current.emit('message:remove', message)
  }

  const editMessage = (message) => {
    socket.current.emit('message:edit', message)
  }

  return {
    loading,
    messages,
    sendMessage,
    rooms,
    setRooms,
    setUser,
    user,
    createRoom,
    roomUpdate,
    removeMessage,
    editMessage,
  }
}
