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

  // const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [rooms, setRooms] = useState([])
  const [roomsTest, setRoomsTest] = useState([])

  // const { current: socket } = useRef(
  //   io(SERVER_URI, {
  //     query: {
  //       roomId: 'user.roomId',
  //       userName: user.userName,
  //     },
  //   })
  // )

  // useEffect(() => {
  //   socket.current.emit('message:get', roomId)
  // }, [roomId])

  useEffect(() => {
    socket.current = io(SERVER_URI, {
      query: {
        roomId,
        userName: user.userName,
      },
    })

    socket.current.emit('user:add', user)

    socket.current.emit('message:get', roomId)

    socket.current.emit('rooms:get')

    socket.current.emit('roo:get')

    socket.current.on('rooms:update', (rooms) => {
      setRooms(rooms)
    })
    // socket.on('user_list:update', (users) => {
    //   setUsers(users)
    // })

    socket.current.on('message_list:update', (messages) => {
      setMessages(messages)
    })

    socket.current.on('rooms:all', (roo) => {
      console.log(roo)
      setRoomsTest(roo)
    })

    return () => {
      socket.current.disconnect()
    }
  }, [roomId])

  const createRoom = (room) => {
    console.log(room)
    socket.current.emit('rooms:create', room)
  }

  const sendMessage = (message) => {
    socket.current.emit('message:add', message)
  }

  // const removeMessage = (message) => {
  //   socket.emit('message:remove', message)
  // }

  return {
    messages,
    sendMessage,
    rooms,
    setRooms,
    setUser,
    user,
    roomsTest,
    createRoom,
  }
}
