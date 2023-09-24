import { SERVER_URI } from '../constatnts'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { getUsersRooms } from '../http'

export default function useChat() {
  const socket = useRef(null)
  const dispatch = useDispatch()

  const user = useSelector(({ userReducer }) => userReducer.user)
  const currentRoom = useSelector(({ roomReducer }) => roomReducer.currentRoom)

  // const roomId = localStorage.getItem('roomId')
  // const userName = localStorage.getItem('userName')
  // const avatar = localStorage.getItem('avatar')

  // const [user, setUser] = useState({
  //   roomId: roomId,
  //   userName: userName,
  //   avatar: avatar,
  //   roomAvatar: 'https://avatars.githubusercontent.com/u/66380357?v=4',
  // })

  const [messages, setMessages] = useState([])
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    socket.current = io(SERVER_URI, {
      query: {
        userId: user._id,
        roomId: currentRoom._id,
        userName: user.userName,
      },
    })

    // socket.current.on('change', (change) => {
    //   console.log(change, 'changes')
    //   // dispatch(getUsersRooms(user._id))
    // })

    // socket.current.on('conect', (users) => console.log(users))
    // socket.current.emit('user:add', user)

    // socket.current.emit('room:get', user._id)

    // socket.current.on('room_list:update', (rooms) => {
    //   console.log(rooms, 'upd')
    //   setRooms(rooms)
    // })

    socket.current.emit('message:get', currentRoom._id)

    socket.current.on('message_list:update', (messages) => {
      setMessages(messages)
      setLoading(false)
      // dispatch(getUsersRooms(user._id))
    })

    // socket.current.on('rooms:all', (rooms) => {
    //   setRooms(rooms)
    // })

    return () => {
      socket.current.disconnect()
    }
  }, [currentRoom._id])

  // const createUser = (user) => {
  //   socket.current.emit('user:create', user)
  // }

  // const createRoom = (room) => {
  //   socket.current.emit('rooms:create', room)
  // }

  const sendMessage = (message) => {
    socket.current.emit('message:add', message)
    // dispatch(getUsersRooms(message.userId))
  }

  // const roomUpdate = (mes) => {
  //   socket.current.emit('room:update', mes)
  // }

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
    removeMessage,
    editMessage,
    // rooms,
    // setRooms,
    // user,
    // createRoom,
    // roomUpdate,
    // createUser,
  }
}
